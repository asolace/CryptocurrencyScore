import React, { Component } from 'react'
import axios from 'axios'

import { Button, ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from 'reactstrap';

class Profile extends Component {
  state = {
    username: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    let result = await axios.post('/api/user_profile_update', this.state)
    console.log(result);
  }

  render() {
    const { user } = this.props
    return (
      <div className="user-profile-container">
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input name="username" id="username" placeholder={user.username} value={this.state.username} onChange={this.handleChange}/>
          </FormGroup>

          <Button className="right" color="success" size="sm" onClick={this.handleSubmit}>Update</Button>
        </Form>

        <div>
          <Label>Email:</Label>
          <span className="users-data">{user.email}</span>
        </div>

        <div>
          <Label>Coins Rated:</Label>
          <span className="users-data">{user.ratingsCount || 0}</span>
        </div>

        <div>
          <Label>Influence Rating:</Label>
          <span className="users-data">{user.influenceRating || 0}</span>
        </div>
      </div>
    )
  }
}


export default Profile
