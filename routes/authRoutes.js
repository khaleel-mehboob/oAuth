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
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id});
  if(existingUser) {
    return done(null, existingUser);
  } 
  const user = await new User({ googleId: profile.id }).save()
  done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: keys.facebookClientID,
  clientSecret: keys.facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ facebookId: profile.id});
  if(existingUser) {
    return done(null, existingUser);
  } 
  const user = await new User({ facebookId: profile.id }).save();
  done(null, user);
}));

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => res.redirect('/'));
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => res.redirect('/'));
router.get('/api/v1/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get('/api/v1/auth/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;