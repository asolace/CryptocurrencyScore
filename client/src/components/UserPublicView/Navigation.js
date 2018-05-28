import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/userNavActions'

import { ListGroup, ListGroupItem } from 'reactstrap'

class SideContent extends Component {
  handleNavClick = event => {
    this.props.renderContent(event.currentTarget.dataset.id)
  }

  render() {
    const { userNav, userProfile } = this.props

    return (
      <div>
        <div className="profile-nav-icon">
          <h4 className="profile-username">{userProfile.username}</h4>
          <img src={userProfile.googlePhotos} alt="profile-img"/>
        </div>
        <ListGroup className="user-nav">
          <ListGroupItem data-id="profile" className={userNav === 'profile' ? "user-nav-selected" : ''} onClick={this.handleNavClick}><i className="fa fa-user-circle"></i>Profile</ListGroupItem>
          <ListGroupItem data-id="coins-rated" className={userNav === 'coins-rated' ? "user-nav-selected" : ''} onClick={this.handleNavClick}><i className="fa fa-bitcoin"></i>Coins Rated</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps({ userNav }) {
  return { userNav }
}

export default connect(mapStateToProps, actions)(SideContent)
