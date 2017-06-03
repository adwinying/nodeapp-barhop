const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    type: [String],
    default: [],
  },
});

const Log = mongoose.model('Log', logModel);

// TODO: Add methods

module.exports = Log;
