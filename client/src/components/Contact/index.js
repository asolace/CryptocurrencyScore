import React, { Component } from 'react'
import axios from 'axios'

import helpers from '../../helpers'
import { Alert, Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap'

class Contact extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    alertVisible: false,
    messageSuccess: false,
    invalidForm: false
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = async event => {
    event.preventDefault()
    if (this.validateForm()) {
      let response = await axios.post('/api/contact', this.state)

      if (response.data.success) {
        this.setState({
          name: '',
          email: '',
          message: '',
          alertVisible: true,
          messageSuccess: true,
          invalidForm: false,
        })
      } else {
        this.setState({
          alertVisible: true,
          messageSuccess: false,
          invalidForm: false,
        })
      }
    }
  }

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  }

  validateForm = () => {
    const { name, email, message } = this.state

    if (name.length < 1 || !helpers.validateEmail(email) || message.length < 5) {
      this.setState({ invalidForm: true })
      return false
    }
    return true
  }

  render() {
    const { messageSuccess, alertVisible, invalidForm, name, message, email } = this.state

    return(
      <div className="contact">
        <div className="contact-header-container">
          <div className="contact-header">
            <h2>Contact Us</h2>
            <h5>Leave us a message and we'll get back to you as soon as possible.</h5>
          </div>
        </div>

        <div className="contact-form container">
          <Alert color={messageSuccess ? "success" : "danger"} isOpen={alertVisible} toggle={this.onAlertDismiss}>
            {messageSuccess ? "Message Sent" : "Failed to send message"}
          </Alert>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input invalid={invalidForm && name.length < 1} type="name" name="name" id="name" value={name} placeholder="John Doe III" onChange={this.onChange} />
              <FormFeedback>This field is required!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input invalid={invalidForm && !helpers.validateEmail(email)} type="email" name="email" id="email" value={email} placeholder="example@email.com" onChange={this.onChange} />
              <FormFeedback>Must be a valid email</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input invalid={invalidForm && message.length < 5} type="textarea" name="message" id="message" value={message} onChange={this.onChange} />
              <FormFeedback>Message length must be longer</FormFeedback>
            </FormGroup>

            <Button color="success" type="submit" className="float-right" onClick={this.onSubmit}>Send</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Contact
