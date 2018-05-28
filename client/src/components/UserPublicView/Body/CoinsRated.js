import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SortSymbol from '../../Templates/SortSymbol'
import helpers from '../../../helpers'

import { Table } from 'reactstrap'

class CoinsRated extends Component {
  state = {
    sortId: 'rank',
    sortAsc: true,
  }

  openRowDropdown = () => {
    console.log('works');
  }

  renderCoins = () => {
    return this.props.coinsRated
      .sort((a, b) => {
        if (this.state.sortId !== "name") return helpers.sortNumber(this.state.sortAsc, a, b, this.state.sortId)
        if (this.state.sortId === "name") return helpers.sortString(this.state.sortAsc, a, b, 'name')
        else return this.state.sortAsc ? a.rank - b.rank : b.rank - a.rank
      })
      .map((coin, i) => {
        const { name, symbol, logo, userRating, rank } = coin

        return (
          <tr key={i} onClick={this.openRowDropdown}>
            <td>{rank}</td>
            <td>
              <Link to={`/info/${symbol}`}>
                <img className="coin-list-logo" src={logo} alt=""/>
                { ` ${name} (${symbol})` }
              </Link>
            </td>
            <td>
              <span className={`grade-box ${helpers.renderRatingBox(userRating)}`}>
                {userRating}
              </span>
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
    const { sortId, sortAsc } = this.state

    return (
      <div className="user-table">
        <div className="user-table-heading">
          <h4>Rated Coins</h4>
        </div>
        <Table striped hover className="list-table">
          <thead>
            <tr>
              <th id="rank" className="list-sort" onClick={this.toggleSort}>
                # <SortSymbol sortId={sortId} sortAsc={sortAsc} divId="rank"/>
              </th>
              <th id="name" className="list-sort" onClick={this.toggleSort}>
                Name <SortSymbol sortId={sortId} sortAsc={sortAsc} divId="name"/></th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.props.coinsRated && this.renderCoins()}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default CoinsRated
