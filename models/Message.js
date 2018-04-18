const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  name: String,
  email: String,
  message: String,
  dateRecieved: Date,
  read: { type: Boolean, default: false }
})

const Message = module.exports = mongoose.model('messages', MessageSchema)
