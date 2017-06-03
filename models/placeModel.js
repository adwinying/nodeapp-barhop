const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeModel = new Schema({
  yelpId: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  attendees: {
    type: [String],
    default: [],
  },
});

const Place = mongoose.model('place', placeModel);

Place.findByIds = (placeIds, callback) => {
  Place.find({
    'placeId': { $in: placeIds },
  }, (err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, docs);
    }
  });
};

// TODO: Add methods

module.exports = Place;
