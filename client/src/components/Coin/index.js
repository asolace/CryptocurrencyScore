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

      try {
        let res = await axios.get('/api/coin/detail/' + symbol)
        this.setState({
          coin: res.data.coin
        })
      } catch (e) {
        console.log(e)
      }
  }

  render() {
    const { coin } = this.state
    
    return (
      <div className="coin-container">
        {coin &&
          <React.Fragment>
            <Header coin={coin}/>

            <div className="coin-body">
              <Row>
                <Col md="3">
                  <SideContent coin={coin} />
                </Col>
                <Col md="9">
                  <CoinGraph coin={coin}/>
                </Col>
              </Row>
              <Details coin={coin} />
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default Coin
