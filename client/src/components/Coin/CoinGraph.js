import React, { Component } from 'react'
import axios from 'axios'
import ReactHighstock from 'react-highcharts/ReactHighstock'

class CoinGraph extends Component {
  state = {
    data: [],
    fetching: true
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.coin !== this.props.coin) {
      try {
        const DaysEndpoint = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${this.props.coin.symbol}&tsym=USD&limit=2000`

        let daysResults = await axios.get(DaysEndpoint, {
          headers: { 'authorization': "Apikey " + process.env.REACT_APP_CRYPTOCOMPARE_API }
        })

        let mappedDays = daysResults.data.Data.Data.map(data => [ data.time * 1000, data.close ])

        this.setState({
          data: mappedDays,
          fetching: false
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    const { name } = this.props.coin
    return (
      <div className="coin-graph-cointainer">
        <ReactHighstock config={{
            chart: {
              zoomType: 'x'
            },

            rangeSelector: {
              selected: 1
            },

            title: {
              text: `${name} Price`
            },

            series: [{
              name: 'Price',
              data: this.state.data,
              tooltip: {
                valueDecimals: 2
              }
            }]
          }}></ReactHighstock>
      </div>
    )
  }
}

export default CoinGraph
