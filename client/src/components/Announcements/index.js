import React, { Component } from 'react'
import { Alert } from 'reactstrap'

class Announcements extends Component {
  state = {
    info: true,
    danger: true,
    warning: true
  }

  infoDismiss = () => this.setState({ info: false })
  warningDismiss = () => this.setState({ warning: false })



  render() {
    return (
      <div className="announcements">
        <Alert color="danger">
          <span className="announcement-header">Important!</span>
          <ul className="announcements-container">
            <li>Coin ratings are currently bias and holds no weight.</li>
            <li>Coin data may not be updated.</li>
          </ul>
        </Alert>
      </div>
    )
  }
}

export default Announcements
