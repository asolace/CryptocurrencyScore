const Message = require('../models/Message')

module.exports = app => {
  app.post('/api/contact', async (req, res) => {

    const newMessage = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      dateRecieved: Date.now()
    })

    try {
      const message = await newMessage.save()
      res.send({ message, success: true })
    } catch (err) {
      res.status(422).send({ err, success: false })
    }
  })
}
