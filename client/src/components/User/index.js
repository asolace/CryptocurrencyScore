import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'reactstrap'

import Body from './Body'
import Loading from '../Loading'
import Navigation from './Navigation'

class User extends Component {
  state = {}

  render() {
    if (this.props.user) {
      return (
        <div>
          <Row>
            <Col className="user-nav-container" xs="4">
              <Navigation user={this.props.user}/>
            </Col>
            <Col xs="8">
              <Body />
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
