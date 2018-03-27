import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/userNavActions'

import { Card, ListGroup, ListGroupItem } from 'reactstrap'

class SideContent extends Component {
  handleNavClick = event => {
    this.props.renderContent(event.currentTarget.dataset.id)
  }

  render() {
    const { userNav } = this.props

    return (
      <Card body outline>
        <ListGroup className="user-nav">
          <ListGroupItem data-id="profile" className={userNav === 'profile' ? "user-nav-selected" : ''} onClick={this.handleNavClick}><i className="fa fa-user-circle"></i>Profile</ListGroupItem>
          <ListGroupItem data-id="coin-rating" className={userNav === 'coin-rating' ? "user-nav-selected" : ''} onClick={this.handleNavClick}><i className="fa fa-bitcoin"></i>Coins Rated</ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}

function mapStateToProps({ userNav }) {
  return { userNav }
}

export default connect(mapStateToProps, actions)(SideContent)
