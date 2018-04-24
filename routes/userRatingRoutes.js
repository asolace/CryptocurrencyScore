const User = require('../models/User')
const UserRating = require('../models/UserRating')
const Coin = require('../models/Coin')

module.exports = app => {
  // app.get('/api/user/rating-list', (req, res) => {
  //   User.getUserRatingList(req.query._id, userRatedCoins => {
  //     res.json(userRatedCoins)
  //   })
  // })

  app.get('/api/user/rating', async (req, res) => {
    let result = await User.findOne(req.query)
    let response = {}

    if (result === null) {
      response.message = 'Not yet rated'
      response.success = false
      res.json(response)
    } else {
      response.rating = result.rating
      response.success = true
      res.json(response)
    }
  })

  app.post('/api/coin-update', (req, res) => {
    const { coinId, userId, coinRatingUpdate } = req.body

    User.addOrUpdateUserRating(coinId, userId, coinRatingUpdate, (message, coinId) => {
      Coin.calculateAndUpdateCoinRating(coinId)
      res.json(message)
    })
  })

}
