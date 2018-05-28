import React, { Component } from 'react'

import { Label } from 'reactstrap';

class Profile extends Component {
  state = {}


  render() {
    const { userProfile } = this.props

    return (
      <div className="user-profile-container">

        <hr className="my-2" />

        <div>
          <Label>Email:</Label>
          <span className="users-data">{userProfile.email}</span>
        </div>

        <div>
          <Label>Coins Rated:</Label>
          <span className="users-data">{userProfile.ratedCoins.length || 0}</span>
        </div>

        <div>
          <Label>Influence Rating:</Label>
          <span className="users-data">{userProfile.influenceRating || 0}</span>
        </div>
      </div>
    )
  }
}

export default Profile
