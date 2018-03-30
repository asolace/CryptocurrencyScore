const passport = require('passport')
const User = require('../models/User')

module.exports = app => {
  // Google Oauth
  app.get('/auth/google', passport.authenticate('google'))

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile')
  })

  // Coinbase Oauth
  app.get('/auth/coinbase', passport.authenticate('coinbase', {
    scope: ['wallet:user:email', 'wallet:accounts:read']
  }))

  app.get('/auth/coinbase/callback', passport.authenticate('coinbase'), (req, res) => {
    res.redirect('/')
  })

  //---- USERS SECTION ---//
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  // Auth purpose
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })

  // Entire User's data
  app.get('/api/user_data', async (req, res) => {
    let user = await User.findOne({ _id: req.user._id})
    res.json(user)
  })

  // Update username
  app.post('/api/user_profile_update', (req, res) => {
    let updates = {
      username: req.body.username
    }

    User.findOneAndUpdate({ _id: req.user._id}, updates, (err, user) => {
      if (err) console.log(`Error in updating username: ${err}`);
      else res.json({ success: true, message: `Username successfully updated to: ${req.body.username}` })
    })
  })
}
