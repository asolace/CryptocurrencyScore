const axios = require('axios')
const i2b = require("imageurl-base64")
const helper = require('../helper')
const Coin = require('../models/Coin')
const keys = require('../config/keys')

const CoinMarketCapURL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency'
const CryptoCompareURL = 'https://min-api.cryptocompare.com/data/all/coinlist'

let getCoinMap = async () => {
  console.log("Getting coin list from CoinMarketCap API...")
  
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
      console.log('Getting coin MAP from CoinMarketCap API call error... ', e.response.data)
    } else {
      console.log('Getting coin MAP from CoinMarketCap error... ', e)
    }
  }
}

let getCoinInfo = async () => {
  try {
    let res = await axios.get(CryptoCompareURL, {
      headers: { 'Apikey': keys.cryptoCompareApi }
    })

    let dataObjs = res.data.Data
    let BaseURL = res.data.BaseImageUrl
    for (let symbol in dataObjs) {
      let TotalCoinSupply = 0
      let Rank = 0
      
      if (dataObjs[symbol].TotalCoinSupply !== null && dataObjs[symbol].TotalCoinSupply !== undefined && dataObjs[symbol].TotalCoinSupply !== "N/A") {        
        TotalCoinSupply = Number.parseInt((dataObjs[symbol].TotalCoinSupply).replace(/,/g, ''))
      }

      if (dataObjs[symbol].SortOrder !== null && dataObjs[symbol].SortOrder !== undefined && dataObjs[symbol].TotalCoinSupply !== "N/A") {        
        Rank = Number.parseInt((dataObjs[symbol].SortOrder).replace(/,/g, ''))
      }

      let coinData = {
        symbol: dataObjs[symbol].Name,
        rank: Rank,
        logo: BaseURL + dataObjs[symbol].ImageUrl,
        algorithm: dataObjs[symbol].Algorithm,
        proofOfType: dataObjs[symbol].ProofType,
        total_supply: TotalCoinSupply
      }
        Coin.addOrUpdateCoin(coinData)
    }
  } catch (e) {
    if (e.response) {
      console.log('Getting coin INFO from CoinMarketCap API call error... ', e.response.data)
    } else {
      console.log('Getting coin INFO from CoinMarketCap error... ', e)
    }
  }
}

getCoinMap()
getCoinInfo()
