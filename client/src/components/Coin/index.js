import React, { Component } from 'react'
import axios from 'axios'

import Details from './Details'
import Header from './Header'
import SideContent from './SideContent'
import CoinGraph from './CoinGraph'

import { Row, Col } from 'reactstrap'

class Coin extends Component {
  state = {
    coin: {}
  }

  async componentDidMount() {
    const symbol = this.props.match.params.id
    let res = await axios.get('/api/coin/info?symbol=' + symbol)

    this.setState({
      coin: res.data.coin
     })
  }

  render() {
    const { coin } = this.state

    return (
      <div className="coin-container">
        <Header coin={coin}/>

        <div className="coin-body">
          <Row>
            <Col sm="3">
              <SideContent coin={coin} />
            </Col>
            <Col sm="9">
              <CoinGraph coin={coin}/>
            </Col>
          </Row>
          <Details coin={coin} />
        </div>
      </div>
    )
  }
}

export default Coin
