const Coin = require('../models/Coin')
const axios = require('axios')
const keys = require('../config/keys')

module.exports = app => {
  app.get('/api/coin/list/:page', (req, res) => {
    if (req.params.page === "all") {
      Coin.find({}, (err, coins) => {
        if (err) console.log(err)

        res.json({ coins })
      })
      return
    }

    const page = Number.parseInt(req.params.page)
    const max = page > 1 ? page * 100 + 100 : 100
    const min = page > 1 ? page * 100 : 0

    let query = {rank: { $gt: min, $lte: max }}

    if (req.user) {
      Coin.getCoinsMappedWithUserRankList(query, req.user._id, coins => {
        res.json({ coins, pages: 4 })
      })
    } else {
      Coin.find(query, (err, coins) => {
        if (err) console.log(err)

        res.json({ coins, pages: 4 })
      })
    }

  })

  app.get('/api/coin/info', (req, res) => {
    Coin.findOne({ symbol: req.query.symbol }, (err, coin) => {
      if (err) console.log(err)

      res.json({ coin })
    })
  })

  app.get('/api/coin/detail/:id', async (req, res) => {
    let data = {}
    let BaseURL = 'https://www.cryptocompare.com/api/data/'
    let detailURL = 'coinsnapshotfullbyid/?id='
    let socialURL = 'socialstats/?id='

    let detailRes = await axios.get(BaseURL + detailURL + req.params.id)
    let socialRes = await axios.get(BaseURL + socialURL + req.params.id)

    data.details = detailRes.data.Data
    data.social = socialRes.data.Data

    res.json({ data })
  })

  app.post('/api/coin/master-coin-update', (req, res) => {
    const { userId, coinId, coinRatingUpdate } = req.body

    if ((userId === '5ad9ebb3a083fc00141d2316') || (userId === '5ad9f0799674903f4fc87604')) { // Prod - Dev
      let query = { _id: coinId }

      Coin.findOne(query).then(data => {
        if (data === null) {
          res.send(`Coin id: ${coinId} does not exsist.`)
        } else {
          Coin.findOneAndUpdate(query, { rating: coinRatingUpdate }, () => {
            res.send(`${coinId} Successfully Updated`)
          })
        }
      })

    } else {
      res.send('Not authorized')
    }
  })

  app.post('/api/coin/master-reset', (req, res) => {
    const { userId } = req.body

    if ((userId === '5ad9ebb3a083fc00141d2316') || (userId === '5ad9f0799674903f4fc87604')) {

      Coin.update({}, { rating: 'N' }, { multi: true }, (err, count) => {
        if (err) console.log(err)
        else console.log(count)
      })

    } else {
      res.send(userId, ' Not authorized')
    }
  })
}
