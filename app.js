const express = require('express');
// const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cookieSession = require('express-session');

const passport = require('passport');
require('./config/db');
require('./models/User')
const keys = require('./config/keys');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cookieSession({
//   maxAge: 30 * 24 * 60 * 60 * 1000,
//   keys: [keys.cookieKey]
// }));


app.use(cookieSession({
  resave: true,
  saveUninitialized: true,
  secret: keys.cookieKey
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);

module.exports = app;