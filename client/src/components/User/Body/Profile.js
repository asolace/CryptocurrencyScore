import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

class Profile extends Component {
  state = {}

  handelEdit = () => {
    console.log('edit');
  }

  render() {
    const { user } = this.props
    return (
      <div className="user-profile-container" style={{width: "100%"}}>

        stuff


      </div>
    )
  }
}


export default Profile
