//@ts-check
const express = require("express");
const { Client } = require("pg");
const PORT = 3000;

const client = new Client({
  password: "postgres",
  user: "postgres",
  host: "postgres",
  port: 5431
});
const app = express();

app.get("/api/users", async (req, res) => {
  try {
    const result = await client
      .query("SELECT * FROM users")
      .catch(err => console.log("Catch Err:", err));
    ///@ts-ignore
    console.log(result, result.rows[0]);
    ///@ts-ignore
    res.json({ posts: result.rows[0] });
  } catch (error) {
    console.log("ERR:", error);
  }
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log("Started users_service at http://localhost:%d", PORT);
  });
})();
