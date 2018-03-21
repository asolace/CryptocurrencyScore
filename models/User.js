const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  googlePhotos: String
})

const User = module.exports = mongoose.model('User', UserSchema)
