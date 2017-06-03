const express = require('express');
const mongodb = require('./config/mongoose');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const compression = require('compression');

const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Connect to DB
mongodb.config();

// Compression mw
app.use(compression());

// Body Parser mw
app.use(bodyParser.json());

// Passport mw
passport.config(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/place', placeRoutes);

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
