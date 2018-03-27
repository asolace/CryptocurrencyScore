import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

class Profile extends Component {
  render() {
    const { user } = this.props
    return (
      <div className="user-profile-container">
        <img src={user.googlePhotos} alt="profile-img"/>

        <ListGroup>
          <ListGroupItem><span className="user-profile-label">Username:</span> {user.username}</ListGroupItem>
          <ListGroupItem><span className="user-profile-label">Email:</span> {user.email}</ListGroupItem>
        </ListGroup>

      </div>
    )
  }
}


export default Profile
