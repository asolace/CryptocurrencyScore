import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Row, Col } from 'reactstrap'

import Loading from '../Loading'
import Navigation from './Navigation'

class User extends Component {
  state = {}

  render() {
    if (this.props.user) {
      const { username } = this.props.user
      return (
        <div>
          <h1>{ username }</h1>
          <Row>
            <Col xs="3">
              <Navigation />
            </Col>
            <Col xs="auto">
            </Col>
            <Col xs="3">
            </Col>
          </Row>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps)(User)
