import React,  { Component } from 'react'
import * as actions from '../../../actions/userActions'
import { connect } from 'react-redux'

import { Card } from 'reactstrap'

import CoinsRated from './CoinsRated'
import Profile from './Profile'

class Body extends Component {
  componentDidMount() {
    this.props.fetchUserCoinList(this.props.user._id)
  }

  render() {
    return (
      <Card body outline>
        {this.props.userNav === 'profile' && <Profile user={this.props.user}/>}
        {this.props.userNav === 'coins-rated' && <CoinsRated />}
      </Card>
    )
  }
}

function mapStateToProps({ userNav }) {
  return { userNav }
}

export default connect(mapStateToProps, actions)(Body)
