import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/userActions'
import axios from 'axios'

import { Row, Col } from 'reactstrap'

import Body from './Body'
import Loading from '../Loading'
import Navigation from './Navigation'

class User extends Component {
  state = {}

  async componentDidMount() {
    const result = await axios.get('/api/user_data')
    this.props.fetchUserCoinList(this.props.userId)

    this.setState({ user: result.data })
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <Row>
            <Col className="user-nav-container" xs="4">
              <Navigation user={this.state.user}/>
            </Col>
            <Col className="user-table-container" xs="8">
              <Body user={this.state.user}/>
            </Col>
          </Row>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

export default connect(null, actions)(User)
