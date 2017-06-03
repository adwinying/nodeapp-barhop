const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userModel = require('./user');

const logModel = new Schema({
  yelpId: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  users: {
    type: [userModel],
  },
});

const Log = mongoose.model('Log', logModel);

// TODO: Add methods

module.exports = Log;
