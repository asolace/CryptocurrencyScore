import React, { Component } from 'react'
import axios from 'axios'

import { Table } from 'reactstrap'

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
      const { name } = coin._coinId

      return (
        <div key={i}>{name}</div>
      )
    })
  }

  render() {
    console.log(this.state);
    return (
      <Table>
        <thead>
          <th>#</th>
          <th>Name</th>
          <th></th>
        </thead>
        {this.state.coins && this.renderCoins()}
      </Table>
    )
  }
}

export default CoinsRated
