import React,  { Component } from 'react'
import { connect } from 'react-redux'

import { Card } from 'reactstrap'

import CoinsRated from './CoinsRated'
import Profile from './Profile'

class Body extends Component {
  render() {
    return (
      <Card body outline>
        {this.props.userNav === 'profile' && <Profile user={this.props.user}/>}
        {this.props.userNav === 'coins-rated' && <CoinsRated userId={this.props.user._id} />}
      </Card>
    )
  }
}

function mapStateToProps({ userNav }) {
  return { userNav }
}

export default connect(mapStateToProps)(Body)
