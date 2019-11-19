const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./config/passport')
require('./services/coinUpdate')

mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .catch(err => console.log(err))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  cookieSession({
    maxAge: 3*24*60*60*1000, // session expires in days/hrs/mins/s/ms
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/userRoutes')(app)
require('./routes/contactRoutes')(app)
require('./routes/coinRoutes')(app)
require('./routes/userRatingRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
  console.log(`
    © Asolace Development

    Server started on port ${PORT}...

    CSSore Server initiated!
  `);
})
