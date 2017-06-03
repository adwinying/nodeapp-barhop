const express = require('express');
const mongodb = require('./config/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./config/passport');

const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Connect to DB
mongodb.config();

// CORS mw
if (process.env.ENV === 'dev') {
  console.log('cors enabled');
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
}

// Body Parser mw
app.use(bodyParser.json());

// Passport mw
passport.config(app);

// Routes
app.use('/api/auth', authRoutes);

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
