const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');

const mongodb = require('./config/mongoose');
const passport = require('./config/passport');

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

// redirect all unmatched URLs to main site
app.use(express.static(path.join(__dirname, 'build')));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

// Start express server
app.listen(port, () => {
  console.log('Server listening on port', port);
});
