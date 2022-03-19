const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id})
  .then((existingUser) => {
    if(existingUser) {
      // We already have a record with given profile ID
      done(null, existingUser);
    } else {
      // We don't have a user record with this ID, make a new record
      new User({ googleId: profile.id })
        .save()
        .then(user => done(null, user));
    }
  });
}));

passport.use(new FacebookStrategy({
  clientID: keys.facebookClientID,
  clientSecret: keys.facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookId: profile.id})
  .then((existingUser) => {
    if(existingUser) {
      // We already have a record with given profile ID
      done(null, existingUser);
    } else {
      // We don't have a user record with this ID, make a new record
      new User({ facebookId: profile.id })
        .save()
        .then(user => done(null, user));
    }
  });
}));


const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google'));
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook'));
router.get('/api/v1/auth/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});
router.get('/api/v1/auth/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;