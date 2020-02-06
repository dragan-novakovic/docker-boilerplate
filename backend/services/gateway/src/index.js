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

const PROTO_PATH_USERS =
  process.env.PRODUCTION === "true"
    ? path.join(__dirname, "protos", "users.proto")
    : path.join(__dirname, "..", "src", "protos", "users.proto");

const PROTO_PATH_POSTS =
  process.env.PRODUCTION === "true"
    ? path.join(__dirname, "protos", "posts.proto")
    : path.join(__dirname, "..", "src", "protos", "posts.proto");
const PORT = 5000;

const packageDefinition = protoLoader.loadSync(PROTO_PATH_USERS, {
  keepCase: true,
  defaults: true
});
const userPkg = grpc.loadPackageDefinition(packageDefinition).user;

///@ts-ignore
const grpc_client = new userPkg.UserService(
  "users:3000",
  grpc.credentials.createInsecure()
);

const post_packageDefinition = protoLoader.loadSync(PROTO_PATH_POSTS, {
  keepCase: true,
  defaults: true
});
const postPkg = grpc.loadPackageDefinition(post_packageDefinition).post;

//@ts-ignore
const grpc_posts_client = new postPkg.PostService(
  "posts:3002",
  grpc.credentials.createInsecure()
);
const client = new Client("postgres://docker:docker@postgres:5432/docker");

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const id = uuidv4();
    const result = await redisClient.hmsetAsync(
      username,
      "id",
      id,
      "password",
      password
    );

    if (result === "OK") {
      res.json({ result, id });
    } else {
      res.json({ result: JSON.stringify(result) });
    }
  } catch (error) {
    console.log("SOME ERR WITH REGISTER", error);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user_data = await redisClient.hgetallAsync(username);

    if (password === user_data.password) {
      res.json({ result: "ALL GUD BOI", id: user_data.id });
    } else {
      res.json({ result: "BAD BOI" });
    }
  } catch (error) {
    console.log("SOME ERR WITH LOGIN", error);
  }
});

app.post("/api/user-info", async (req, res) => {
  const { id, name } = req.body;
  try {
    //@ts-ignore
    grpc_client.insertDetails({ id, name }, async (error, userDetails) => {
      if (!error) {
        console.log("successfully saved user with Details", userDetails);

        res.json({ userDetails });
      } else {
        console.log("ITS AN GRPC ERR", error);
      }
    });
  } catch (error) {
    console.log("ERR:", error);
    res.json({ time: null });
  }
});

app.post("/api/info", async (req, res) => {
  const { id } = req.body;
  try {
    //@ts-ignore
    grpc_client.getDetails({ id }, async (error, userDetails) => {
      if (!error) {
        console.log("successfully fetch userDetails", userDetails);

        res.json({ userDetails });
      } else {
        console.log("ITS AN GRPC ERR", error);
      }
    });
  } catch (error) {
    console.log("ERR:", error);
    res.json({ time: null });
  }
});

/// POSTS

app.post("/api/posts", async (req, res) => {
  const { user_id } = req.body;
  // get all user posts
  try {
    //@ts-ignore
    grpc_posts_client.getPostList({ id: user_id }, async (error, posts) => {
      if (!error) {
        console.log("successfully fetch users posts", posts);

        res.json(posts);
      } else {
        console.log("ITS AN GRPC ERR", error);
      }
    });
  } catch (error) {
    console.log("ERR:", error);
    res.json({ time: null });
  }
});

app.post("/api/user-posts", async (req, res) => {
  const { user_id, title, description } = req.body;

  try {
    //@ts-ignore
    grpc_posts_client.createPost(
      { id: uuidv4(), user_id, title, description },
      async (error, post) => {
        if (!error) {
          console.log("successfully created Post", post);

          res.json({ post });
        } else {
          console.log("ITS AN GRPC ERR", error);
        }
      }
    );
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
