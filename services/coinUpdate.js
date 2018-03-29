const axios = require('axios')
const mongoose = require('mongoose')
const i2b = require("imageurl-base64")
const helper = require('../helper')

const Coin = require('../models/Coin')

const CoinMarketCapURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=0'
const CryproCompareURL = 'https://www.cryptocompare.com/api/data/'

let getCoinList = async () => {
  setInterval(async () => {
    try {
      let res = await axios.get(CoinMarketCapURL)
      let dataArray = res.data

      dataArray.forEach(async data => {
        let coinData = {
          name: data.name,
          symbol: data.symbol,
          rank: helper.toInt(data.rank),
          price_usd: helper.toFloat(data.price_usd),
          price_btc: helper.toFloat(data.price_btc),
          market_cap_usd: helper.toFloat(data.market_cap_usd),
          available_supply: helper.toFloat(data.available_supply),
          total_supply: helper.toFloat(data.total_supply),
          max_supply: helper.toFloat(data.max_supply),
          percent_change_1h: helper.toFloat(data.percent_change_1h),
          percent_change_24h: helper.toFloat(data.percent_change_24h),
          percent_change_7d: helper.toFloat(data.percent_change_7d),
          last_updated: data.last_updated
        }

        Coin.addOrUpdateCoin(coinData)
      })
    } catch (e) {
      console.log('Getting -MAIN- data from CoinMarketCap ' + e)
    }
  }, 5*70*1000)
}

let getCoinList2 = async () => {
  setInterval(async () => {
    try {
      const BaseImgURL = 'https://www.cryptocompare.com'
      let res = await axios.get(CryproCompareURL + 'coinlist/')
      let dataObjs = res.data.Data

      for (let symbol in dataObjs) {
        i2b(BaseImgURL + dataObjs[symbol].ImageUrl, (err, data) => {
          if (err) return
          else logoUri = data.dataUri

          let coinData = {
            symbol: dataObjs[symbol].Name,
            ccId: Number.parseInt(dataObjs[symbol].Id),
            logo: logoUri,
            algorithm: dataObjs[symbol].Algorithm,
            proofOfType: dataObjs[symbol].ProofType
          }

          Coin.addOrUpdateCoin(coinData)
        })
      }
    } catch (e) {
      console.log('Getting -LIST- from CryptoCompare ' + e)
    }

  }, 5*90*1000)
}

// let getCoinMiscData2 = () => {
//   Coin.find({}, (err, coins) => {
//     coins.forEach((coin, i) => {
//
//       setTimeout(async () => {
//         try {
//           let res = await axios.get(CryproCompareURL + 'coinsnapshotfullbyid/?id=' + coin.ccId)
//           let dataObjs = res.data.Data
//
//           let coinData = {
//             symbol: dataObjs.General.Symbol,
//             description: dataObjs.General.Description,
//             features: dataObjs.General.Features,
//             technology: dataObjs.General.Technology,
//             url: dataObjs.General.Website,
//             ico: dataObjs.ICO
//           }
//
//           Coin.addOrUpdateCoin(coinData)
//         } catch (e) {
//           console.log('Getting -FULL- coin details from CryptoCompare ' + e)
//         }
//
//
//       }, i*60*1000)
//
//       if (i === coin.length - 1) {
//         console.log(`
//           -------------------------------------
//           --- FULL DETAIL UPDATES COMPLETED ---
//           -------------------------------------
//         `)
//       }
//
//     })
//   })
// }
//
// let getCoinSocialData = () => {
//   Coin.find({}, (err, coins) => {
//     coins.forEach((coin, i) => {
//
//       setTimeout(async () => {
//         try {
//           let res = await axios.get(CryproCompareURL + 'socialstats/?id=' + coin.ccId)
//           let dataObjs = res.data.Data
//
//           let coinData = {
//             symbol: coin.symbol,
//             twitter: dataObjs.Twitter,
//             reddit: dataObjs.Reddit,
//             facebook: dataObjs.Facebook,
//             repo: dataObjs.CodeRepository
//           }
//
//           Coin.addOrUpdateCoin(coinData)
//         } catch (e) {
//           console.log('Getting -SOCIAL- details from CryptoCompare ' + e)
//         }
//
//
//       }, i*60*1000)
//
//       if (i === coin.length - 1) {
//         console.log(`
//           --------------------------------
//           --- SOCIAL UPDATES COMPLETED ---
//           --------------------------------
//         `)
//       }
//
//     })
//   })
// }
//
getCoinList()
getCoinList2()
// getCoinMiscData2()
// getCoinSocialData()
