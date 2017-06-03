const express = require('express');
const loggedIn = require('../config/passport').loggedIn;
const yelpService = require('../services/yelpService');
const Place = require('../models/placeModel');

const placeRouter = express.Router();
let yelpToken;

function sendErr(res, err) {
  res.status(500).json({
    success: false,
    message: err,
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
                attendees = result.attendees;
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

  // TODO: match listings with local DB
  // TODO: return listings
});

module.exports = placeRouter;