import React, { Component } from 'react'
import { connect } from 'react-redux'

import SortSymbol from '../../Templates/SortSymbol'
import RatingDropdown from '../../Templates/RatingDropdown'
import helpers from '../../../helpers'

import { Table } from 'reactstrap'

class CoinsRated extends Component {
  state = {
    sortId: 'index',
    sortAsc: true,
  }

  componentDidMount() {
    this.setState({ coins: this.props.userCoinList })
  }

  renderCoins = () => {
    return this.state.coins
      .sort((a, b) => helpers.sortString(this.state.sortAsc, a._coinId, b._coinId, 'name'))
      .map((coin, i) => {
        const { name, _id, symbol, logo } = coin._coinId

        return (
          <tr key={i}>
            <td>{i+1}</td>
            <td>
              <img className="coin-list-logo" src={logo} alt=""/>
              {` ${name} (${symbol})`}
            </td>
            <td>
              <RatingDropdown coinId={_id} symbol={symbol} userId={this.props.userId}/>
            </td>
          </tr>
        )
      })
  }

  toggleSort = event => {
    let id = event.currentTarget.id

    if (this.state.sortId === id) {
      this.setState({ sortAsc: !this.state.sortAsc })
    } else {
      this.setState({ sortId: id, sortAsc: true })
    }
  }

  render() {
    console.log(this.state);
    const { sortId, sortAsc } = this.state

    return (
      <div className="user-table">
        <div className="user-table-heading">
          <h4>Your Rated Coins</h4>
        </div>
        <Table striped hover className="list-table">
          <thead>
            <tr>
              <th>#</th>
              <th id="name" className="list-sort" onClick={this.toggleSort}>
                Name <SortSymbol sortId={sortId} sortAsc={sortAsc} divId="name"/></th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.state.coins && this.renderCoins()}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps({ userCoinList }) {
  return { userCoinList }
}

export default connect(mapStateToProps)(CoinsRated)
