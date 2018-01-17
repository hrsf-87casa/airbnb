const express = require('express');
const cookieParser = require('cookie-parser'); //TODO npm install cookieParser
const session = require('express-session'); //TODO npm install express-session
const passport = require('./userAuth/passport'); //TODO npm install passport
const auth = require('./userAuth/auth');

const router = express.Router();

const getAllListings = require('../database/queries/getAllListings.js');
const user = require('../database/queries/getBooking.js');
const getListingsByCity = require('../database/queries/getListingsByCity.js');
const checkAvailability = require('../database/queries/checkAvailability.js');
const saveReservation = require('../database/queries/saveReservation.js');
const googleAPI = require('../api/gMapClient.js');
const getListingById = require('../database/queries/getListingById.js');
const db = require('../database');
// require('../database'); and ^ move all this stuff into index.js

// passport
router.post('/signup', async (req, res) => {
  try {
    if (await db.getUser(req.body.username)) { // if user exists error
      return res.status(400).json('username exists!');
    }
    await auth.addUser(req.body.username, req.body.password, req.body.phoneNumber, req.body.email);
    // email user or something welcoming them if you wish
    return res.sendStatus(200);
  } catch (err) {
    return res.status(401).json(err.stack);
  }
});

router.post('login', passport.authenticate('local'), (req, res) => res.sendStatus(200));

// listings
router.get('*/listings-bryce', (req, res) => getListingsByCity(req.query.city, (results) => {
  console.log(results);
  res.json(results);
}
));

router.post('*/bookings-james', (req, res) => {
  let dates = req.body.data;
  let listingId = req.body.listing;
  let userId = req.body.user;
  checkAvailability(listingId, dates, results => {
    results ? saveReservation(listingId, userId, dates, results => res.send('success')) : res.send('failure');
  });
});

router.get('*/listings-ted', (req, res) => getAllListings(results => {
  res.json(results);
}));

router.get('*/listings-iris', (req, res) => {
  var finalResults = {};
  getListingById(req.query.listingId)
    .then((listingObj) => {
      finalResults.listing = listingObj[0];
      return googleAPI.getAddress(JSON.stringify(listingObj));
    })
    .then((addr) => {
      finalResults.address = addr;
      return googleAPI.getLatLong(addr, (data) => {
        finalResults.latLong = data.json.results[0].geometry.location;
        res.json(finalResults);
      });
    })
    .catch(err => res.json(err));
});

router.get('/usercomponent-v', (req, res) => user.getAllBooking(function(err, results) {
  if (err) {
    return res.statusCode(500);
  } else {
    return res.json(results);
  }
}));

router.post('/usercomponent-v', (req, res) => user.cancelReservation(function(err, results) {
  //console.log(req.body.id)
  if (err) {
    console.error(err);
  } else {
    res.json(results);
  }
}, req.body.id));

module.exports = router;
