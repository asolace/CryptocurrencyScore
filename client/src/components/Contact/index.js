import React, { Component } from 'react'
import axios from 'axios'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Contact extends Component {
  state = {
    name: '',
    email: '',
    message: '',
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault()
    axios.post('/api/contact', this.state)
    this.setState({
      name: '',
      email: '',
      message: '',
    })
  }

  render() {
    return(
      <div className="contact">
        <div className="contact-header-container">
          <div className="contact-header">
            <h2>Contact Us</h2>
            <h5>Leave us a message and we'll get back to you as soon as possible.</h5>
          </div>
        </div>

        <div className="contact-form container">
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="name" name="name" id="name" value={this.state.name} placeholder="John Doe III" onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" value={this.state.email} placeholder="example@email.com" onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input type="textarea" name="message" id="message" value={this.state.message} onChange={this.onChange} />
            </FormGroup>

            <Button color="success" type="submit" className="float-right" onClick={this.onSubmit}>Send</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Contact
