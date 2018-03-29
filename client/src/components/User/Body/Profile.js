import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from 'reactstrap';

class Profile extends Component {
  state = {}

  handelEdit = () => {
    console.log('edit');
  }

  render() {
    const { user } = this.props
    return (
      <div className="user-profile-container">
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input name="username" id="username" placeholder={user.username} />
          </FormGroup>
        </Form>

        <div>
          <Label>Email:</Label>
          <span className="users-data">{user.email}</span>
        </div>

        <div>
          <Label>Coins Rated:</Label>
          <span className="users-data">10</span>
        </div>

        <div>
          <Label>Influence Rating:</Label>
          <span className="users-data">5</span>
        </div>
      </div>
    )
  }
}


export default Profile
