const express = require('express');
const app = express();
const port = 5000;

app.get('/api', (req, res) =>
  res.json({ secret: (Math.random() * 100).toFixed(0) })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
