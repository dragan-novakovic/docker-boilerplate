//@ts-check
const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid/v4");
const path = require("path");
const { Client } = require("pg");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const redisClient = require("./redis-client");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PROTO_PATH =
  process.env.PRODUCTION === "true"
    ? path.join(__dirname, "protos", "users.proto")
    : path.join(__dirname, "..", "src", "protos", "users.proto");
const PORT = 5000;

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userPkg = grpc.loadPackageDefinition(packageDefinition).user;

///@ts-ignore
const grpc_client = new userPkg.UserService(
  "users:3000",
  grpc.credentials.createInsecure()
);
const client = new Client("postgres://docker:docker@postgres:5432/docker");

// auth with redis
// cache with redis

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await redisClient.hmsetAsync(
      username,
      "id",
      uuidv4(),
      "password",
      password
    );

    const testData = await redisClient.hgetallAsync(username);
    console.log(testData);

    res.json({ result });
  } catch (error) {
    console.log("SOME ERR WITH REGISTER", error);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const res = await redisClient.hgetall(username);
    console.log(res);
  } catch (error) {
    console.log("SOME ERR WITH REGISTER");
  }
});

app.get("/api/user-info", async (req, res) => {
  try {
    //@ts-ignore
    grpc_client.list({}, async (error, users) => {
      if (!error) {
        console.log("successfully fetch users list data", users);

        res.json({ time: users });
      } else {
        console.log("ITS AN GRPC ERR");
        console.error(error);
      }
    });
  } catch (error) {
    console.log("ERR:", error);
    res.json({ time: null });
  }
});

/// POSTS

app.get("/api/user-posts", async (req, res) => {
  try {
    //@ts-ignore
    grpc_client.list({}, async (error, users) => {
      if (!error) {
        console.log("successfully fetch users list data", users);

        res.json({ time: users });
      } else {
        console.log("ITS AN GRPC ERR");
        console.error(error);
      }
    });
  } catch (error) {
    console.log("ERR:", error);
    res.json({ time: null });
  }
});

app.post("/api/user-posts", async (req, res) => {
  try {
    //@ts-ignore
    grpc_client.list({}, async (error, users) => {
      if (!error) {
        console.log("successfully fetch users list data", users);

        res.json({ time: users });
      } else {
        console.log("ITS AN GRPC ERR");
        console.error(error);
      }
    });
  } catch (error) {
    console.log("ERR:", error);
    res.json({ time: null });
  }
});

(async () => {
  await client
    .connect()
    .catch(err => console.log("Postgres client connect ERR:", err));

  app.listen(PORT, () => {
    console.log("Started at http://node-prod:%d", PORT);
  });
})();

/*
How to deal with features such as security, throttling, caching and monitoring at one place
How to avoid chatty communication between clients and microservices
How to satisfy the needs of heterogeneous clients
How to route requests to backend microservices
How to discover working microservice instances
How to discover when a microservice instance is not running
*/
