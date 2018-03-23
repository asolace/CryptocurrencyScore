import React from 'react'
import helper from '../../helpers'

import { Card } from 'reactstrap'

const SideContent = ({ coin }) =>
  <div className="side-content-container">
    <Card body outline color="secondary">
      <span className={`grade-box ${helper.renderRatingBox(coin.rating)}`}>
        {coin.rating}
      </span>

      <h5>Price</h5>
      <p>{helper.stringToUSD(coin.price_usd)} <span className="color-lg">usd</span></p>
      <p>{coin.price_btc} <span className="color-lg">btc</span></p>

      <br />

      <p className={helper.colorChange(coin.percent_change_1h)}>
        {coin.percent_change_1h} % <span className="color-lg"> 1h</span>
      </p>
      <p className={helper.colorChange(coin.percent_change_24h)}>
        {coin.percent_change_24h} % <span className="color-lg"> 24h</span>
      </p>
      <p className={helper.colorChange(coin.percent_change_7d)}>
        {coin.percent_change_7d} % <span className="color-lg"> 7d</span>
      </p>


      <hr />


      <h5>Market Cap</h5>
      <p>{helper.stringToUSD(coin.market_cap_usd)} <span className="color-lg">usd</span></p>


      <hr />


      <h5>Circulating Supply</h5>
      <p>{helper.stringToUSD(coin.available_supply)} <span className="color-lg">usd</span></p>


      <hr />


      <h5>Max Supply</h5>
      <p>{helper.stringToUSD(coin.max_supply)} <span className="color-lg">usd</span></p>
    </Card>
  </div>


export default SideContent
