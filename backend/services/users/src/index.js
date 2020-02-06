//@ts-check
const { Client } = require("pg");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

const PORT = 3000;
const client = new Client(process.env.DATABASE_URL);

// grpc service definition
const userProtoPath =
  process.env.PRODUCTION === "true"
    ? path.join(__dirname, "protos", "users.proto")
    : path.join(__dirname, "..", "src", "protos", "users.proto");

const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  defaults: true
});
const userPackageDefinition = grpc.loadPackageDefinition(userProtoDefinition)
  .user;

async function getDetails(call, callback) {
  const { id } = call.request;

  try {
    const res = await client.query("SELECT * FROM user WHERE id = $1", [id]);
    callback(null, {
      id: res.rows[0].id,
      name: res.rows[0].name
    });
  } catch (error) {
    console.log("ERR:", error);
  }
}

async function insertDetails(call, callback) {
  const { id, name } = call.request;

  try {
    const res = await client.query(
      "INSERT INTO user_details(id, name) VALUES($1, $2) RETURNING *",
      [id, name]
    );
    callback(null, { id: res.rows[0].id, name: res.rows[0].name });
  } catch (error) {
    console.log("INSERT DETAILS ERROR", error);
  }
}

function deleteDetails(call, callback) {
  let existingNoteIndex = false;
  if (existingNoteIndex) {
    callback(null, {});
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Not found"
    });
  }
}

// main
function main() {
  const server = new grpc.Server();

  //@ts-ignore
  server.addService(userPackageDefinition.UserService.service, {
    getDetails,
    insertDetails,
    deleteDetails
  });

  // gRPC server
  server.bind(`users:${PORT}`, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log(`gRPC user-server running at localhost:${PORT}`);
}

(async () => {
  await client.connect();
  main();
})();
