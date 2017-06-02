const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const app = express();
const port = process.env.API_PORT || 8000;

app.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

app.listen(port, () => {
  console.log('Server listening on port', port);
});
