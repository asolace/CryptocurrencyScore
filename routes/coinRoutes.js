const Coin = require('../models/Coin')
const axios = require('axios')
const requireAdmin = require('../middlewares/requireAdmin')
const keys = require('../config/keys')

const coinUpdate = require('../services/coinUpdate')

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

  app.get('/api/coin/detail/:id', async (req, res) => {
    const coinSymbol = req.params.id
    let coin = await Coin.findOne({ symbol: coinSymbol })
    const coinId = coin.ccId

    if (coin.hasMeta) {
      res.json({ coin })
    } else {
      const CoinMarketCapURL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info'
      const CryptoCompareURL = 'https://min-api.cryptocompare.com/data/social/coin/latest'

      try {
        let coinMarketCapRes = await axios.get(CoinMarketCapURL, {
          headers: { 'X-CMC_PRO_API_KEY': keys.coinMarketCapApi },
          params: { id: coinId }
        })

        let cryptoCompareRes = await axios.get(CryptoCompareURL, {
          headers: { 'authorization': "Apikey " + keys.cryptoCompareApi },
          params: { id: coinId }
        })
  
        let coinMarketCapData = coinMarketCapRes.data.data
        let cryptoCompareData = cryptoCompareRes.data.Data
        let coinData = {
          ccId: coinId,
          url: coinMarketCapData[coinId].urls.website[0],
          description: coinMarketCapData[coinId].description,
          twitter: cryptoCompareData.Twitter,
          reddit: cryptoCompareData.Reddit,
          facebook: cryptoCompareData.Facebook,
          repo: cryptoCompareData.CodeRepository,
          technicalDoc: coinMarketCapData[coinId].urls.technical_doc,
          chat: coinMarketCapData[coinId].urls.chat,
          hasMeta: true
        }
  
        let updates = await Coin.updateMetaCoin(coinData)

        res.json({ coin: updates })
      } catch (e) {
        console.log(e)
        res.json({ status: 400, message: "Failed call..."})
      }
    }
  })

  app.post('/api/coin/master-coin-update', requireAdmin, (req, res) => {
    const { coinId, coinRatingUpdate } = req.body
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
  })

  app.post('/api/coin/update-all', requireAdmin, (req, res) => {
    try {
      coinUpdate.updateData()
      res.send({
        status: 200,
        message: "All coin updated"
      })
    } catch (err) {
      res.status(422).send(err)
    }
  })

  app.post('/api/coin/master-reset', requireAdmin, async (req, res) => {
    let message = await Coin.updateMany({}, { $set: { ratingLetter: 'N' }})

    try {
      res.send({
        status: 200,
        message: "All coin ratings reseted.",
        obj: message
      })
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
