const axios = require('axios')
const i2b = require("imageurl-base64")
const helper = require('../helper')
const Coin = require('../models/Coin')
const keys = require('../config/keys')

const CoinMarketCapURL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency'
const CryptoCompareURL = 'https://min-api.cryptocompare.com/data/all/coinlist'

let getCoinMap = async () => {
  console.log("STARTING -- getting coin MAP from CoinMarketCap API...")
  
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
    console.log("COMPLETED -- getting coin MAP from CoinMarketCap API.")
  }
}


let getCoinLatest = async () => {
  console.log("Getting coin META from CoinMarketCap API...")

  try {
    let res = await axios.get(CoinMarketCapURL + '/listings/latest', {
      headers: { 'X-CMC_PRO_API_KEY': keys.coinMarketCapApi }
    })

    let dataArray = res.data.data
    dataArray.forEach(async data => {
      let coinData = {
        symbol: data.symbol,
        available_supply: data.circulating_supply,
        total_supply: data.total_supply,
        max_supply: data.max_supply,
        price_usd: data.quote.USD.price,
        market_cap_usd: data.quote.USD.price,
        percent_change_1h: data.quote.USD.percent_change_1h,
        percent_change_24h: data.quote.USD.percent_change_24h,
        percent_change_7d: data.quote.USD.percent_change_7d,
        last_updated: data.quote.USD.last_updated,
        price_btc: data.quote.BTC.price
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
    console.log("COMPLETED -- getting coin LATEST from CoinMarketCap API.")
  }
}


let getCoinInfo = async () => {
  console.log("STARTING -- getting coin INFO from CryptoCompare API...")

  try {
    let res = await axios.get(CryptoCompareURL, {
      headers: { 'Apikey': keys.cryptoCompareApi }
    })

    let dataObjs = res.data.Data
    let BaseURL = res.data.BaseImageUrl
    for (let symbol in dataObjs) {
      let Rank = 0
      
      if (dataObjs[symbol].SortOrder !== null && dataObjs[symbol].SortOrder !== undefined && dataObjs[symbol].TotalCoinSupply !== "N/A") {        
        Rank = Number.parseInt((dataObjs[symbol].SortOrder).replace(/,/g, ''))
      }

      let coinData = {
        symbol: dataObjs[symbol].Name,
        rank: Rank,
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
    console.log("COMPLETED -- getting coin INFO from CryptoCompare API.")
  }
}


let updateData = () => {
  getCoinMap()
  getCoinLatest()
  getCoinInfo()
}
