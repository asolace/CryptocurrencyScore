const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId
const User = require('./User')

const helper = require('../helper')

const UserRatingSchema = mongoose.Schema({
  _userId: { type: ObjectId, require: true, ref: 'User' },
  _coinId: { type: ObjectId, require: true, ref: 'Coin' },
  rating: String,
  comment: String,
  // Used for rating calculation
  productOfUiAndUr: Number,
  userUi: Number,
})

const UserRating = module.exports = mongoose.model('UserRating', UserRatingSchema)

module.exports.addOrUpdateUserRating = async (coinId, userId, coinRatingUpdate, cb) => {
  const query = { _userId: userId, _coinId: coinId }
  const userInfluenceRating = await User.findOne({_id: userId}, 'influenceRating')

  const productOfUiAndUr = userInfluenceRating.influenceRating * helper.convertRatingLetterToNumber(coinRatingUpdate) // used for rating calculation

  const ratingData = {
    _userId: userId,
    _coinId: coinId,
    rating: coinRatingUpdate,
    productOfUiAndUr: productOfUiAndUr,
    userUi: userInfluenceRating.influenceRating
  }

  UserRating.findOne(query).then(data => {

    // User ranks an unrated coin
    if (data === null && coinRatingUpdate !== 'N') {
      let newUserRating = new UserRating(ratingData)

      User.updateRatingCount({ _userId: query.userId }, 1)

      // Model.save don't update fast enough therefore you have to passin the data object to account for a more updated rating calculation
      newUserRating.save(cb({status: 'success', message: 'Coin successfully added'}, ratingData, true))

    // User updates thier rated coin
    } else if (data !== null) {

      // User sets to N
      if (coinRatingUpdate === 'N') {
        UserRating.remove(query, err => {
          if (err) return handleError(err)

          User.updateRatingCount({ _userId: query.userId }, -1)
          cb({status: 'success', message: 'Coin successfully set to N'}, ratingData, false)
        })
      } else {

        // User updates
        UserRating.findOneAndUpdate(query, ratingData, (err, coin) => {
          if (err) {
            cb({status: 'failed', message: `Update Error: ${err}`})
          } else {

            // Only updates if previous rank was N
            if (coin.rating === 'N') {
              User.updateRatingCount({ _userId: query.userId }, 1)
            }

            cb({status: 'success', message: 'Coin successfully updated'}, ratingData, false)
          }
        })
      }
    }
  })

}
