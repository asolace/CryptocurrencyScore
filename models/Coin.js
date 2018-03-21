const mongoose = require('mongoose')

const CoinSchema = mongoose.Schema({
  ccId: Number,
  name: String,
  symbol: { type: String, unique: true },
  rank: Number,
  url: String,
  logo: String,
  algorithm: String,
  proofOfType: String,
  description: String,
  features: String,
  technology: String,
  twitter: Object,
  reddit: Object,
  facebook: Object,
  repo: Object,
  price_usd: Number,
  price_btc: Number,
  market_cap_usd: Number,
  available_supply: Number,
  total_supply: Number,
  max_supply: Number,
  percent_change_1h: Number,
  percent_change_24h: Number,
  percent_change_7d: Number,
  last_updated: String,
  ico: Object,
  rating: { type: String, default: "N" }
})

const Coin = module.exports = mongoose.model('Coin', CoinSchema)

module.exports.addOrUpdateCoin = coinData => {
  const query = { symbol: coinData.symbol }

  Coin.findOne(query).then(data => {
    if (data === null) {
      let newCoin = new Coin(coinData)
      newCoin.save(() => console.log(`${coinData.symbol} Saved!`))
    } else {
      Coin.findOneAndUpdate(query, coinData, (err, coin) => {
        if (err) console.log(`Update Error: ${err}`)
        else console.log(`${coinData.symbol} Updated!`)
      })
    }
  })
}

module.exports.updateSocialCoin = coinData => {
  const query = { ccId: coinData.ccId }

  Coin.findOne(query).then(data => {
    if (data === null) {
      console.log(`Coin id: ${coinData.ccId} doesn't exsist.`)
    } else {
      Coin.findOneAndUpdate(query, coinData, (err, coin) => {
        if (err) console.log('Social Update Error: ' + err)
        else console.log(`id: ${coin.id} Social Updated!`)
      })
    }
  })
}
