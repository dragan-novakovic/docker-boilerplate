//@ts-check
const { Client } = require("pg");
const path = require("path");
const protoLoader = require("../../gateway/src/node_modules/@grpc/proto-loader");
const grpc = require("../../gateway/src/node_modules/grpc");

const PORT = 3000;
const client = new Client(process.env.DATABASE_URL);

// grpc service definition
const userProtoPath = path.join(
  __dirname,
  "..",
  "src",
  "protos",
  "users.proto"
);
const userProtoDefinition = protoLoader.loadSync(userProtoPath);
const userPackageDefinition = grpc.loadPackageDefinition(userProtoDefinition)
  .user;

async function listUsers(call, callback) {
  try {
    const result = await client
      .query("SELECT * FROM users")
      .catch(err => console.log("Catch Err:", err));

    //@ts-ignore
    console.log(result.rows[0]);
    callback(null, [
      { id: "1", username: "Test1" },
      { id: "1", username: "Test1" }
    ]);
  } catch (error) {
    console.log("ERR:", error);
  }
}
// function createProduct(call, callback) {
//   let note = call.request;
//   note.id = uuidv1();
//   notes.push(note);
//   callback(null, note);
// }
// function deleteProduct(call, callback) {
//   let existingNoteIndex = notes.findIndex(n => n.id == call.request.id);
//   if (existingNoteIndex != -1) {
//     notes.splice(existingNoteIndex, 1);
//     callback(null, {});
//   } else {
//     callback({
//       code: grpc.status.NOT_FOUND,
//       details: "Not found"
//     });
//   }
// }

// main
function main() {
  const server = new grpc.Server();
  // gRPC service
  //@ts-ignore
  server.addService(userPackageDefinition.UserService.service, {
    list: listUsers
    //createProduct,
    //deleteProduct
  });

  // gRPC server
  server.bind(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log(`gRPC user-server running at localhost:${PORT}`);
}

// app.get("/api/users", async (req, res) => {
//   try {
//     const result = await client
//       .query("SELECT * FROM users")
//       .catch(err => console.log("Catch Err:", err));
//     ///@ts-ignore
//     console.log(result.rows[0]);
//     ///@ts-ignore
//     res.json({ posts: result.rows[0] });
//   } catch (error) {
//     console.log("ERR:", error);
//   }
// });

(async () => {
  await client.connect();
  main();
})();
