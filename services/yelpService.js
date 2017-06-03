const request = require('request');

function getYelpToken(callback) {
  const postOpt = {
    method: 'POST',
    url: 'https://api.yelp.com/oauth2/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      grant_type: 'client_credentials',
      client_id: process.env.YELP_CLIENT_ID,
      client_secret: process.env.YELP_CLIENT_SECRET,
    },
  };

  request(postOpt, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(body).access_token);
    }
  });
}

function fetchListing(token, location, callback) {
  const getListingOpt = {
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/search?term=nightlife&location=${location}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  request(getListingOpt, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(body).businesses);
    }
  });
}

module.exports = {
  getYelpToken,
  fetchListing,
};
