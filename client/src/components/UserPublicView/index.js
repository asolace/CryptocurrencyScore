import React, { Component } from 'react'
import axios from 'axios'

import { Row, Col } from 'reactstrap'

import Body from './Body'
import Loading from '../Loading'
import Navigation from './Navigation'

class UserPublicView extends Component {
  state = {
    userProfile: false
  }

  async componentDidMount() {
    const username = this.props.match.params.username
    let res = await axios.get('/api/view?username=' + username)
    this.setState({ userProfile: res.data })
  }

  render() {
    if (this.state.userProfile) {
      return (
        <div className="user">
          <Row>
            <Col className="user-nav-container" xs="4">
              <Navigation userProfile={this.state.userProfile}/>
            </Col>
            <Col className="user-table-container" xs="8">
              <Body userProfile={this.state.userProfile} />
            </Col>
          </Row>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

export default UserPublicView