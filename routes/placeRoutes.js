const express = require('express');
const loggedIn = require('../config/passport').loggedIn;
const yelpService = require('../services/yelpService');
const Place = require('../models/placeModel');

const placeRouter = express.Router();
let yelpToken;

function sendErr(res, err) {
  res.status(500).json({
    success: false,
    message: err.message,
  });
}

function chkYelpToken(req, res, next) {
  if (!yelpToken) {
    console.log('yelpToken not found. Obtaining one');

    yelpService.getYelpToken((err, token) => {
      if (err) {
        sendErr(res, err);
      } else {
        console.log('yelpToken obtained:', token);
        yelpToken = token;
        next();
      }
    });
  } else {
    next();
  }
}

// Fetch listing from yelp and combine with DB data
placeRouter.get('/list', chkYelpToken, (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).send({
      success: false,
      message: 'Bad request: location query required',
    });
  }

  yelpService.fetchListing(yelpToken, location, (err, places) => {
    if (err) {
      sendErr(res, err);
    } else {
      const placeIds = places.map(place => place.id);
      Place.findByIds(placeIds, (dbErr, results) => {
        if (err) {
          sendErr(res, dbErr);
        } else {
          res.json(places.map((place) => {
            let attendees = [];
            results.forEach((result) => {
              if (place.id === result.yelpId) {
                attendees = result.attendeeIds;
              }
            });

            return {
              id: place.id,
              name: place.name,
              url: place.url,
              imageUrl: place.image_url,
              location: place.location.city,
              price: place.price || 'Unknown',
              rating: place.rating,
              attendees,
            };
          }));
        }
      });
    }
  });
});

// Add/remove attending users
// TODO: restrict to user only
placeRouter.patch('/join', (req, res) => {
  const isAttending = req.body.isAttending;
  const placeId = req.body.id;
  const userId = req.body.userId;

  function handleResults(err, place) {
    if (err) {
      sendErr(res, err);
    } else {
      res.json(place);
    }
  }

  if (isAttending) {
    Place.attend(placeId, userId, handleResults);
  } else {
    Place.deattend(placeId, userId, handleResults);
  }
});

module.exports = placeRouter;
