const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
  userId: {
    type: Number,
    required: true,
  },
});

module.exports = userModel;
