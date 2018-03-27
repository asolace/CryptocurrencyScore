import React, { Component } from 'react'
import axios from 'axios'

class CoinsRated extends Component {
  state = {}

  async componentDidMount() {
    let result = await axios.get('/api/user/rating-list', {
      params: { _userId: this.props.userId }
    })

    this.setState({ coins: result.data })
  }

  renderCoins = () => {
    return this.state.coins.map((coin, i) => {
      const { name, symbol, logo } = coin._coinId

      return (
        <div key={i}>{name}</div>
      )
    })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.coins && this.renderCoins()}
      </div>
    )
  }
}

export default CoinsRated
