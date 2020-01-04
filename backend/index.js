//@ts-check
const express = require('express');
const { Client } = require('pg');
const PORT = 5000;

const client = new Client({
  password: 'postgres',
  user: 'postgres',
  host: 'postgres',
  port: 5432
});
const app = express();

app.get('/api/secret', (req, res) =>
  res.json({ secret: (Math.random() * 100).toFixed(0) })
);

app.get('/api/now', async (req, res) => {
  try {
    const result = await client
      .query('SELECT NOW()')
      .catch(err => console.log('Catch Err:', err));
    ///@ts-ignore
    console.log(result, result.rows[0]);
    ///@ts-ignore
    res.json({ time: result.rows[0] });
  } catch (error) {
    console.log('ERR:', error);
  }
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log('Started at http://localhost:%d', PORT);
  });
})();
