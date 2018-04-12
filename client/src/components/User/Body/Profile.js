import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions/userActions'
import axios from 'axios'

import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

class Profile extends Component {
  state = {
    username: '',
    updateReponse: {
      success: null
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.updateUsername(this.state.username)
    })
  }

  handleUsernameSubmit = async event => {
    event.preventDefault()
    let result = await axios.post('/api/username_update', this.state)
    this.setState({ updateReponse: result.data })
  }

  render() {
    const { user } = this.props

    return (
      <div className="user-profile-container">
        <Form onSubmit={this.handleUsernameSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input valid={this.state.updateReponse.success} invalid={this.state.updateReponse.success === false} name="username" id="username" placeholder={user.username} value={this.state.username} onChange={this.handleChange}/>
            {this.state.updateReponse.message && <FormFeedback valid={this.state.updateReponse.success}>{this.state.updateReponse.message}</FormFeedback>}
          </FormGroup>

          <Button className="right" color="success" size="sm" onClick={this.handleUsernameSubmit}>Update</Button>
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


export default connect(null, actions)(Profile)
