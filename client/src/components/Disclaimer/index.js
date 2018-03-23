import React from 'react'

const Disclaimer = () =>
  <div className="disclaimer-container">
    <h2>Disclaimer</h2>

    <div className="disclaimer-content">
      <h5>Not Investment Advice</h5>
      <p>
        Information provided on this website are not investment, trading,
        or any sort of advice and should not be treated as such.
        We are not responsible for any lost, or lost of potential gains.
        Cryptocurrency Score would recommend which coins to avoid but you should
        do your due diligence to research each coin.
        Cryptocurrency Score are not responsible for any illigal investment made by you.
      </p>

      <h5>Information Accuracy</h5>
      <p>
        Coin price, marketcap, price change percentage and other data are updated from
        <a href="https://coinmarketcap.com" target="_blank" rel="noopener noreferrer"> CoinMarketCap</a>,
        <a href="https://www.cryptocompare.com" target="_blank" rel="noopener noreferrer"> CryptoCompare</a> and
        <a href="https://chasing-coins.com" target="_blank" rel="noopener noreferrer"> ChasingCoins</a> API.
        Cryptocurrency Score will not hold any responsibility for any missing or wrong information.
        Any use of these information on this website will be at your own risk.
      </p>
    </div>
  </div>

export default Disclaimer
