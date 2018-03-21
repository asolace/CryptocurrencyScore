const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const UserRatingSchema = mongoose.Schema({
  _userId: { type: ObjectId, require: true },
  _coinId: { type: ObjectId, require: true },
  rating: String,
  comment: String
})

const UserRating = module.exports = mongoose.model('UserRating', UserRatingSchema)

module.exports.addOrUpdateUserRating = (coinId, userId, coinRatingUpdate) => {
  const query = { _userId: userId, _coinId: coinId }
  const ratingData = { _userId: userId, _coinId: coinId, rating: coinRatingUpdate }

  UserRating.findOne(query).then(data => {
    if (data === null) {
      let newUserRating = new UserRating(ratingData)
      newUserRating.save(() => console.log(`${coinId} Saved!`))
    } else {
      UserRating.findOneAndUpdate(query, ratingData, (err, coin) => {
        if (err) console.log(`Update Error: ${err}`)
        else console.log(`${coinId} Updated!`)
      })
    }

  })
}
