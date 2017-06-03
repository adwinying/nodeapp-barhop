const express = require('express');
const passport = require('passport');
const loggedIn = require('../config/passport').loggedIn;

const authRouter = express.Router();

authRouter.get('/login', passport.authenticate('twitter'));

authRouter.get('/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/api/auth/check',
  }));

authRouter.get('/check', loggedIn, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = authRouter;
