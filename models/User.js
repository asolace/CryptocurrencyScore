const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  googlePhotos: String,
  ratingsCount: Number,
  influenceRating: Number
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.updateRatingCount = (query, counter) => {
  try {
    User.findOneAndUpdate(query, {$inc: {ratingsCount: counter}})
  } catch (e) {
    console.log(e)
  }
}
