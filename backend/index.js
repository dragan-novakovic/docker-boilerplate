//@ts-check
const express = require("express");
const { Client } = require("pg");
const PORT = 5000;

const client = new Client("postgres://docker:docker@postgres:5432/docker");

const app = express();

app.get("/api/secret", (req, res) =>
  res.json({ secret: (Math.random() * 100).toFixed(0) })
);

app.get("/api/now", async (req, res) => {
  try {
    const result = await client
      .query("SELECT NOW()")
      .catch(err => console.log("Catch Err:", err));
    ///@ts-ignore
    console.log(result.rows[0]);
    ///@ts-ignore
    res.json({ time: result.rows[0] });
  } catch (error) {
    console.log("ERR:", error);
  }
});

app.get("/api/test", async (req, res) => {
  try {
    const result = await client
      .query("SELECT * FROM test")
      .catch(err => console.log("Catch Err:", err));
    ///@ts-ignore
    console.log(result.rows[0]);
    ///@ts-ignore
    res.json({ time: result.rows[0] });
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
