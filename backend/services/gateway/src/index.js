//@ts-check
const express = require("express");
const path = require("path");
const { Client } = require("pg");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH =
  process.env.PRODUCTION === "true"
    ? path.join(__dirname, "protos", "users.proto")
    : path.join(__dirname, "..", "src", "protos", "users.proto");
const PORT = 5000;

const client = new Client("postgres://docker:docker@postgres:5432/docker");

console.log(process.env.PRODUCTION, PROTO_PATH);
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userPkg = grpc.loadPackageDefinition(packageDefinition).user;

///@ts-ignore
const grpc_client = new userPkg.UserService(
  "users:3000",
  grpc.credentials.createInsecure()
);

const app = express();

app.get("/api/secret", (req, res) =>
  res.json({ secret: (Math.random() * 100).toFixed(0) })
);

app.get("/api/test", async (req, res) => {
  try {
    //@ts-ignore
    grpc_client.list({}, async (error, users) => {
      if (!error) {
        console.log("successfully fetch List notes", users);

        res.json({ time: users });
      } else {
        console.log("ITS AN GRPC ERR");
        console.error(error);
      }
    });
  } catch (error) {
    console.log("ERR:", error);
    return { time: null };
  }
});

(async () => {
  await client.connect().catch(err => console.log("ERRRRR:", err));

  app.listen(PORT, () => {
    console.log("Started at http://node-prod:%d", PORT);
  });
})();
