const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const passport = require('./passport');
const auth = require('./auth');
const db = require('../database');
const airbnb = require('../airbnb');

const bookings = require('./bookings');
const listings = require('./listings');
const profile = require('./profile');

const multer = require('multer'),
  multerS3 = require('multer-s3'),
  fs = require('fs'),
  AWS = require('aws-sdk');

const router = express.Router();
const reactRoute = (req, res) =>
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
const protectedReactRoute = (req, res) =>
  req.session.passport
    ? res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
    : res.redirect('/login');

/*
  Passport and user authentication
*/

router.use(cookieParser());
router.use(
  session({ secret: 'airbnb-casa', resave: false, saveUninitialized: false }),
);
router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', async (req, res) => {
  try {
    if (await db.users.get(req.body.username)) {
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
  res
    .set('access-control-allow-credentials', 'true')
    .status(200)
    .json({ userId: req.session.passport.user }),
);

/*
  Listings search and details
*/

router.post('/api/listings/search', async (req, res) => {
  try {
    return res
      .status(200)
      .json(await airbnb.search(req.body.city, req.body.state));
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.get('/api/listings/details/:id', async (req, res) => {
  try {
    return res.status(200).json(await db.search.byId(req.params.id));
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

/*
  Reservations
*/

router.get('/api/bookings/list', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }

    return res.status(200).json(await bookings.list(req.session.passport.user));
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/bookings/reserve', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }

    return res
      .status(200)
      .json(
        await bookings.reserve(
          req.session.passport.user,
          req.body.listingId,
          req.body.start,
          req.body.end,
        ),
      );
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/bookings/cancel', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }

    return res.sendStatus(
      await bookings.cancel(req.body.bookingId, req.session.passport.user),
    );
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

/*
  User Listings
*/

router.get('/api/listings', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }

    return res.status(200).json(await listings.get(req.session.passport.user));
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/listings/host', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }

    return res
      .status(200)
      .json(await listings.host(req.body, req.session.passport.user));
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/listings/cancel', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }

    return res.sendStatus(
      await listings.cancel(req.body.listingId, req.session.passport.user),
    );
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.get('/api/user/profile', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    return res
      .status(200)
      .json(await profile.getAllUserInfo(req.session.passport.user));
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

// File Upload Route handling
// TODO Set these as environment variables
AWS.config.update({
  accessKeyId: 'AKIAIGV3I6CABFE4JKYQ',
  secretAccessKey: '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',
  subregion: 'us-west-1',
});
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    limits: { fileSize: 524280 },
    bucket: 'airbnbcasa',
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
    ACL: 'public-read',
  }),
});

router.post(
  '/api/user/profilepictureupload',
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      if (!req.session.passport) {
        return res.sendStatus(401);
      }
      await profile.uploadPicture(req.session.passport.user, req.file.location);
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json(err.stack);
    }
  },
);

// update profile
router.post('/api/updateprofile', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    await profile.updateProfile(
      req.session.passport.user,
      req.body.displayName,
      req.body.location,
      req.body.tagline,
      req.body.bio,
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

/*
  React Router
*/

router.get(
  '/login',
  (req, res) =>
    req.session.passport ? res.redirect('/') : reactRoute(req, res),
);
router.get(
  '/signup',
  (req, res) =>
    req.session.passport ? res.redirect('/') : reactRoute(req, res),
);

router.get('/logoff', (req, res) =>
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  }),
);
router.get('/listings*', reactRoute);
router.get('/bookings*', protectedReactRoute);
router.get('/host', protectedReactRoute);
router.get('/profile', protectedReactRoute);
router.get('/settings', protectedReactRoute);

module.exports = router;
