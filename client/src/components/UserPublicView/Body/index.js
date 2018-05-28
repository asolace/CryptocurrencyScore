import React,  { Component } from 'react'
import axios from 'axios'
import * as actions from '../../../actions/userActions'
import { connect } from 'react-redux'

import { Card } from 'reactstrap'

import CoinsRated from './CoinsRated'
import Profile from './Profile'

class Body extends Component {
  state = {
    coinsRated: false
  }

  async componentDidMount() {
    let res = await axios.get('/api/user/rating-list', {
      params: { _id: this.props.userProfile._id }
    })

    this.setState({ coinsRated: res.data })
  }

  render() {
    return (
      <Card body outline>
        {this.props.userNav === 'profile' && <Profile userProfile={this.props.userProfile}/>}
        {this.props.userNav === 'coins-rated' && <CoinsRated coinsRated={this.state.coinsRated}/>}
      </Card>
    )
  }
}

function mapStateToProps({ userNav }) {
  return { userNav }
}

export default connect(mapStateToProps, actions)(Body)
