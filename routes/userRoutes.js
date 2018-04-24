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
    req.session = null
    res.redirect('/')
  })

  // Auth purpose
  app.get('/api/auth', (req, res) => {
    res.send(req.user)
  })

  // Entire User's data
  app.get('/api/user_data', (req, res) => {
    User.getUserData(req.user._id, user => {
      res.json(user)
    })
  })

  // Update username
  app.post('/api/username_update', (req, res) => {
    const UsernameUpdate = { username: req.body.username }

    User.find(UsernameUpdate, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (user.length === 0) {
          User.findOneAndUpdate({ _id: req.user._id }, UsernameUpdate, (err, user) => {
            if (err) console.log(`Error in updating username: ${err}`);
            else res.json({ success: true, message: `Username successfully updated.` })
          })
        } else {
          res.json({ success: false, message: `Username is already taken`})
        }
      }
    })

  })
}
