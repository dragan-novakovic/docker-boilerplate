//@ts-check
const express = require("express");
const { Client } = require("pg");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

const PORT = 3000;
const client = new Client(process.env.DATABASE_URL);

// grpc service definition
const userProtoPath = path.join(__dirname, "..", "protos", "users.proto");
const userProtoDefinition = protoLoader.loadSync(userProtoPath);
const userPackageDefinition = grpc.loadPackageDefinition(userProtoDefinition)
  .user;

function listProducts(call, callback) {}
function createProduct(call, callback) {}
function deleteProduct(call, callback) {}

// main
function main() {
  const server = new grpc.Server();
  // gRPC service
  //@ts-ignore
  server.addService(userPackageDefinition.UserService.service, {
    listProducts,
    createProduct,
    deleteProduct
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
