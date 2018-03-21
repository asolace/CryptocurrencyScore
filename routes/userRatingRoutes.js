const UserRating = require('../models/UserRating')

module.exports = app => {
  app.get('/api/user/rating-list', async (req, res) => {

  })

  app.get('/api/user/rating', async (req, res) => {
    let result = await UserRating.findOne(req.query)
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

    UserRating.addOrUpdateUserRating(coinId, userId, coinRatingUpdate)
  })
}
