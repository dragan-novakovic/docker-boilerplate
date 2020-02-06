//@ts-check
const { Client } = require("pg");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");
const uuidv4 = require("uuid/v4");

const PORT = 3002;
const client = new Client(process.env.DATABASE_URL);

// grpc service definition
const postProtoPath =
  process.env.PRODUCTION === "true"
    ? path.join(__dirname, "protos", "posts.proto")
    : path.join(__dirname, "..", "src", "protos", "posts.proto");

const postProtoDefinition = protoLoader.loadSync(postProtoPath);
const postPackageDefinition = grpc.loadPackageDefinition(postProtoDefinition)
  .post;

async function getPostList(call, callback) {
  const { id } = call.request;
  console.log("CALL:", { id });
  try {
    const res = await client.query("SELECT * FROM posts WHERE user_id = $1", [
      id
    ]);

    callback(null, {
      posts: res.rows.map(({ id, user_id, title, description }) => ({
        id,
        user_id,
        title,
        description
      }))
    });
  } catch (error) {
    console.log("SELECT ALL POSTS ERR:", error);
  }
}

async function createPost(call, callback) {
  const { id, user_id, title, description } = call.request;
  console.log(call.request);

  try {
    const res = await client.query(
      "INSERT INTO posts(id, user_id, title, description) VALUES($1, $2, $3, $4) RETURNING *",
      [uuidv4(), id, title, description]
    );
    callback(null, { id: res.rows[0].id });
  } catch (error) {
    console.log("INSERT POST ERROR", error);
  }
}

// main
function main() {
  const server = new grpc.Server();

  //@ts-ignore
  server.addService(postPackageDefinition.PostService.service, {
    getPostList,
    createPost,
    getPost: () => {},
    delete: () => {}
  });

  // gRPC server
  server.bind(`posts:${PORT}`, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log(`gRPC post-server running at localhost:${PORT}`);
}

(async () => {
  await client.connect();
  main();
})();
