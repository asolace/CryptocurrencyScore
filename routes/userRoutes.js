const passport = require('passport')

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

  // User
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}
