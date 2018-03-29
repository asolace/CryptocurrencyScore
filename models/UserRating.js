const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

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
    if (data === null) {
      let newUserRating = new UserRating(ratingData)
      newUserRating.save(cb({status: 'success', message: 'Coin successfully added'}))
    } else {
      UserRating.findOneAndUpdate(query, ratingData, (err, coin) => {
        if (err) cb({status: 'failed', message: `Update Error: ${err}`})
        else cb({status: 'success', message: 'Coin successfully updated'})
      })
    }

  })
}
