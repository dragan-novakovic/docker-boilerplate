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

const userProtoDefinition = protoLoader.loadSync(userProtoPath);
const userPackageDefinition = grpc.loadPackageDefinition(userProtoDefinition)
  .user;

function listUsers(call, callback) {
  try {
    callback(null, {
      users: [
        { id: "1", username: "Test1" },
        { id: "2", username: "Test2" }
      ]
    });
  } catch (error) {
    console.log("ERR:", error);
  }
}

async function createUser(call, callback) {
  let payload = call.request;
  console.log(payload);
  callback(null, payload);
}

function deleteProduct(call, callback) {
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
  // gRPC service
  //@ts-ignore
  server.addService(userPackageDefinition.UserService.service, {
    list: listUsers,
    insert: createUser,
    delete: deleteProduct
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
