//@ts-check
const express = require("express");
const { Client } = require("pg");
const PORT = 3000;

const client = new Client(process.env.DATABASE_URL);
const app = express();

app.get("/api/posts", async (req, res) => {
  try {
    const result = await client
      .query("SELECT * FROM posts")
      .catch(err => console.log("Catch Err:", err));
    ///@ts-ignore
    console.log(result.rows[0]);
    ///@ts-ignore
    res.json({ posts: result.rows[0] });
  } catch (error) {
    console.log("ERR:", error);
  }
});

(async () => {
  await client.connect().catch(e => console.log(e));
  console.log(process.env.DATABASE_URL, "Hello");

  app.listen(PORT, () => {
    console.log("Started posts_service at http://localhost:%d", PORT);
  });
})();
