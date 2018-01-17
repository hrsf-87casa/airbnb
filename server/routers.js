const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./userAuth/passport');
const auth = require('./userAuth/auth');

const router = express.Router();
const {
  getAllListings,
  getListingsByCity,
  checkAvailability,
  saveReservation,
  getListingById,
  userHelper,
  booking,
} = require('../database');
const googleAPI = require('./../api/gMapClient.js');

router.use(cookieParser());
router.use(
  session({ secret: 'airbnb-casa', resave: false, saveUninitialized: false }),
);
router.use(passport.initialize());
router.use(passport.session());

// router.use('/api', passport.authenticate('local', { failureRedirect: '/login' }));

// router.get('/listings', passport.authenticate('local', { failureRedirect: '/login' }), reactRoute);

router.post('/signup', async (req, res) => {
  try {
    if (await userHelper.getUser(req.body.username)) {
      return res.sendStatus(409);
    }
    await auth.addUser(
      req.body.username,
      req.body.password,
      req.body.phoneNumber,
      req.body.email,
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) =>
  res.status(200).json({ userId: req.session.passport.user }),
);

router.post('/api/listings/search', async (req, res) => {
  try {
    const listings = await getListingsByCity(req.body.city, req.body.state);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json(err.stack);
  }
});

router.post('/api/bookings/reserve', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const reservation = await booking.makeReservation(
      req.session.passport.user,
      req.body.listingId,
      req.body.start,
      req.body.stop,
    );
    return res.status(200).json({
      isBooked: true,
      bookingId: reservation.id,
    });
  } catch (err) {
    res.status(500).json(err.stack);
  }
});

router.get('/api/bookings/list', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const reservations = await booking.getAllReservations(req.session.passport.user);
    const reservationsWithListings = await Promise.all(reservations.map(reservation =>
      new Promise(async (resolve, reject) => {
        try {
          const listing = await getListingById(reservation.listing_id);
          resolve({
            id: reservation.id,
            start: reservation.startDate,
            end: reservation.endDate,
            listing,
          });
        } catch (err) {
          reject(err);
        }
      })));
    return res.status(200).json(reservationsWithListings);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/bookings/cancel', async (req, res) => {
  try {
    await booking.cancelReservation(res.body.bookingId);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err.stack);
  }
});

router.get('/usercomponent-v', (req, res) =>
  user.getAllBooking((err, results) => {
    if (err) {
      return res.statusCode(500);
    }
    return res.json(results);
  }));
router.post('/usercomponent-v', (req, res) =>
  user.cancelReservation((err, results) => {
    // console.log(req.body.id)
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  }, req.body.id));

module.exports = router;
