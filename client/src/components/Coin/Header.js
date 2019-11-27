import React from 'react'
import helper from '../../helpers'

const Header = ({ coin }) =>
  <div className="coin-header">
    <div className="coin-flex-item">
      <div className="coin-logo"><img src={coin.logo} alt="" /></div>
      <div className="coin-main">
        <h1>{coin.name}</h1>
        <div className="color-lg">({coin.symbol})</div>
      </div>
    </div>

    <div className="coin-flex-item" style={{ textAlign: "right" }}>
      <div className="coin-price">
        {helper.stringToUSD(coin.price_usd)}
        <span className="coin-sm-label color-lg"> usd</span>
      </div>

      <div>
        <span className={helper.colorChange(coin.percent_change_24h)}>
          ( {coin.percent_change_24h} % )
        </span>
        <span className="coin-sm-label color-lg"> 24hr</span>
      </div>

    </div>
  </div>

export default Header
