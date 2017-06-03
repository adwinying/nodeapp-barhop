const express = require('express');
const mongodb = require('./config/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.API_PORT || 8000;

// CORS mw
app.use(cors());

// Body Parser mw
app.use(bodyParser.json());

// Connect to DB
mongodb.config();

// Routes
// TODO: add routes

// TODO: replace this with static file
app.get('/', (req, res) => {
  res.json({
    message: 'API online',
  });
});

// Start express server
app.listen(port, () => {
  console.log('Server listening on port', port);
});
