const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId
const User = require('./User')

const UserRatingSchema = mongoose.Schema({
  _userId: { type: ObjectId, require: true, ref: 'User' },
  _coinId: { type: ObjectId, require: true, ref: 'Coin' },
  rating: String,
  comment: String
})

const UserRating = module.exports = mongoose.model('UserRating', UserRatingSchema)

module.exports.addOrUpdateUserRating = (coinId, userId, coinRatingUpdate, cb) => {
  const query = { _userId: userId, _coinId: coinId }
  const ratingData = { _userId: userId, _coinId: coinId, rating: coinRatingUpdate }

  UserRating.findOne(query).then(data => {
    if (data === null && coinRatingUpdate !== 'N') {
      let newUserRating = new UserRating(ratingData)

      User.updateRatingCount({ _userId: query.userId }, 1)

      newUserRating.save(cb({status: 'success', message: 'Coin successfully added'}))
    } else if (data !== null) {
      UserRating.findOneAndUpdate(query, ratingData, (err, coin) => {
        if (err) {
          cb({status: 'failed', message: `Update Error: ${err}`})
        }
        else {
          if (coin.rating !== 'N' && coinRatingUpdate === 'N') User.updateRatingCount({ _userId: query.userId }, -1)
          if (coin.rating === 'N' && coinRatingUpdate !== 'N') User.updateRatingCount({ _userId: query.userId }, 1)
          cb({status: 'success', message: 'Coin successfully updated'})
        }
      })
    }
  })

}
