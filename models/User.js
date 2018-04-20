const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  googlePhotos: String,
  ratingsCount: Number,
  influenceRating: { type: Number, default: 1 }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.updateRatingCount = (query, counter) => {
  User.findOneAndUpdate(query, {$inc: {ratingsCount: counter}}, (err, user) => {
    if (err) console.log(`Error in updating ratings counter: ${err}`)
  })
}
