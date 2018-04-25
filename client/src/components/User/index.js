import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/userActions'

import { Row, Col } from 'reactstrap'

import Body from './Body'
import Loading from '../Loading'
import Navigation from './Navigation'

class User extends Component {
  render() {
    if (this.props.user) {
      return (
        <div className="user">
          <Row>
            <Col className="user-nav-container" xs="4">
              <Navigation user={this.props.user}/>
            </Col>
            <Col className="user-table-container" xs="8">
              <Body user={this.props.user} />
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

export default connect(mapStateToProps, actions)(User)
