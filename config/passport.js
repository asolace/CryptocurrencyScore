const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
// const CoinbaseStrategy = require('passport-coinbase').Strategy
const mongoose = require('mongoose')
const keys = require('./keys')

const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {
  done(null, userDataFromCookie);
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email', 'openid'],
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ email: profile.emails[0].value })

    if (existingUser) return done(null, existingUser)

    try {
      const user = await new User({
        username: profile.emails[0].value.split('@')[0],
        googlePhotos: profile.photos[0].value,
        email: profile.emails[0].value
      }).save()

      done(null, user)
    } catch (e) {
      console.log(e)
    }
  }
))

// passport.use(new CoinbaseStrategy({
//     clientID: keys.coinbaseClientID,
//     clientSecret: keys.coinbaseClientSecret,
//     callbackURL: '/auth/coinbase/callback',
//     proxy: true
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     console.log(profile)
//   }
// ))
