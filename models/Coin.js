const mongoose = require('mongoose')
const UserRating = require('./UserRating')
const helper = require('../helper')

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

// The crux of the app (The magical algorithm) jk it's simple
module.exports.calculateAndUpdateCoinRating = async (ratingData, isSaving) => {
  const { _coinId, productOfUiAndUr, userUi } = ratingData

  const CoinIdToSearch = mongoose.Types.ObjectId(_coinId)
  let SumProductOfAllUiAndUrOfRatedCoinArray = await UserRating
    .aggregate([
      { $match: { '_coinId': CoinIdToSearch }},
      { $group: {
        _id: null,
        sumProductOfAllUiAndUr: { $sum: '$productOfUiAndUr' },
        sumOfAllUi: { $sum: '$userUi' }
      }}
    ])

  // Model.save don't update fast enough therefore you have to passin the data object to account for a more updated rating calculation
    if (isSaving) {
      if (SumProductOfAllUiAndUrOfRatedCoinArray.length === 0) {
        SumProductOfAllUiAndUrOfRatedCoinArray.push({
          _id: null,
          sumProductOfAllUiAndUr: 0,
          sumOfAllUi: 0
        })
      }
      SumProductOfAllUiAndUrOfRatedCoinArray[0].sumProductOfAllUiAndUr += productOfUiAndUr
      SumProductOfAllUiAndUrOfRatedCoinArray[0].sumOfAllUi += userUi
    }

  let sumProdUiUr = SumProductOfAllUiAndUrOfRatedCoinArray[0].sumProductOfAllUiAndUr
  let sumUi = SumProductOfAllUiAndUrOfRatedCoinArray[0].sumOfAllUi

  let ratingAsNumber = helper.calculateRatingAsNumber(sumProdUiUr, sumUi)
  let ratingAsLetter = helper.convertRatingNumberToLetter(ratingAsNumber)

  let updatedCoin = await Coin.findOneAndUpdate({ _id: CoinIdToSearch }, { rating: ratingAsLetter })
  console.log(updatedCoin.name, ratingAsLetter);
}

// Updates Coin Data from API
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

// Updates Coin Social Data from API
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
