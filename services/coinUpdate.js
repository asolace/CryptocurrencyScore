const axios = require('axios')
const Coin = require('../models/Coin')
const keys = require('../config/keys')

const CoinMarketCapURL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency'
const CryptoCompareURL = 'https://min-api.cryptocompare.com/data/all/coinlist'

let getCoinMap = async () => {
  console.log("STARTING -- Getting coin MAP from CoinMarketCap API...")
  
  try {
    let res = await axios.get(CoinMarketCapURL + '/map', {
      headers: { 'X-CMC_PRO_API_KEY': keys.coinMarketCapApi }
    })

    let dataArray = res.data.data
    dataArray.forEach(async data => {
      let coinData = {
        ccId: data.id,
        name: data.name,
        symbol: data.symbol
      }

      Coin.addOrUpdateCoin(coinData)
    })
  } catch (e) {
    if (e.response) {
      console.log('ERROR -- Getting coin MAP from CoinMarketCap API call error... ', e.response.data)
    } else {
      console.log('ERROR -- Getting coin MAP from CoinMarketCap error... ', e)
    }
  } finally {
    console.log("COMPLETED -- Getting coin MAP from CoinMarketCap API.")
  }
}


let getCoinLatest = async () => {
  console.log("STARTING -- Getting coin META from CoinMarketCap API...")

  try {
    let res = await axios.get(CoinMarketCapURL + '/listings/latest', {
      headers: { 'X-CMC_PRO_API_KEY': keys.coinMarketCapApi }
    })

    let dataArray = res.data.data
    dataArray.forEach(async data => {
      let btcPrice = data.quote.BTC !== undefined ? data.quote.BTC.price : 0

      let coinData = {
        symbol: data.symbol,
        name: data.name,
        rank: data.cmc_rank,
        available_supply: data.circulating_supply,
        total_supply: data.total_supply,
        max_supply: data.max_supply,
        price_usd: data.quote.USD.price,
        market_cap_usd: data.quote.USD.market_cap,
        percent_change_1h: data.quote.USD.percent_change_1h,
        percent_change_24h: data.quote.USD.percent_change_24h,
        percent_change_7d: data.quote.USD.percent_change_7d,
        last_updated: data.quote.USD.last_updated,
        price_btc: btcPrice
      }

      Coin.addOrUpdateCoin(coinData)
    })
  } catch (e) {
    if (e.response) {
      console.log('ERROR -- Getting coin LATEST from CoinMarketCap API call error... ', e.response.data)
    } else {
      console.log('ERROR -- Getting coin LATEST from CoinMarketCap error... ', e)
    }
  } finally {
    console.log("COMPLETED -- Getting coin LATEST from CoinMarketCap API.")
  }
}


let getCoinInfo = async () => {
  console.log("STARTING -- Getting coin INFO from CryptoCompare API...")

  try {
    let res = await axios.get(CryptoCompareURL, {
      headers: { 'Apikey': keys.cryptoCompareApi }
    })

    let dataObjs = res.data.Data
    let BaseURL = res.data.BaseImageUrl
    for (let symbol in dataObjs) {
      let coinData = {
        symbol: dataObjs[symbol].Name,
        logo: BaseURL + dataObjs[symbol].ImageUrl,
        algorithm: dataObjs[symbol].Algorithm,
        proofOfType: dataObjs[symbol].ProofType
      }
        Coin.addOrUpdateCoin(coinData)
    }
  } catch (e) {
    if (e.response) {
      console.log('ERROR -- Getting coin INFO from CryptoCompare API call error... ', e.response.data)
    } else {
      console.log('ERROR -- Getting coin INFO from CryptoCompare error... ', e)
    }
  } finally {
    console.log("COMPLETED -- Getting coin INFO from CryptoCompare API.")
  }
}


module.exports.updateData = () => {
  getCoinMap()
  getCoinLatest()
  getCoinInfo()
}
