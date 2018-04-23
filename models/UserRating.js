const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const UserRatingSchema = mongoose.Schema({
  _coinId: { type: ObjectId,  ref: 'Coin' },
  rating: String,
  comment: String,
  addedDate: Date,
  deleted: { type: Boolean, default: false },
  // Used for rating calculation
  productOfUiAndUr: Number,
  userUi: Number,
})

module.exports = UserRatingSchema
