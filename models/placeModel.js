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
  attendeeIds: {
    type: [Number],
    default: [],
  },
});

const Place = mongoose.model('place', placeModel);

Place.findByIds = (placeIds, callback) => {
  Place.find({
    yelpId: { $in: placeIds },
  }, (err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, docs);
    }
  });
};

Place.attend = (yelpId, userId, callback) => {
  Place.findOne({ yelpId }, (err, place) => {
    if (err) {
      callback(err, null);
    } else if (place) {
      if (place.attendeeIds.indexOf(+userId) === -1) {
        place.attendeeIds.push(userId);
        place.updated = Date.now();
        place.save((dbErr) => {
          if (dbErr) {
            callback(err, null);
          } else {
            callback(null, place);
          }
        });
      } else {
        callback(new Error('User already attending!'), null);
      }
    } else {
      console.log('Place not found. Creating new db entry');
      const newPlace = new Place({
        yelpId,
        attendeeIds: [userId],
      });
      newPlace.save((dbErr) => {
        if (dbErr) {
          callback(err, null);
        } else {
          callback(null, newPlace);
        }
      });
    }
  });
};

Place.deattend = (yelpId, userId, callback) => {
  Place.findOne({ yelpId }, (err, place) => {
    if (err) {
      callback(err, null);
    } else if (place) {
      const userIndex = place.attendeeIds.indexOf(+userId);
      if (userIndex === -1) {
        callback(new Error('User not found in place DB entry!'), null);
      } else {
        place.attendeeIds.splice(userIndex, 1);
        place.updated = Date.now();
        place.save((dbErr) => {
          if (dbErr) {
            callback(err, null);
          } else {
            callback(null, place);
          }
        });
      }
    } else {
      callback(new Error('Place not found!'), null);
    }
  });
};

module.exports = Place;
