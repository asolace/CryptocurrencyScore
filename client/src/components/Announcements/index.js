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
            <li>While under development coin ratings are currently bias and holds no weight!</li>
          </ul>
        </Alert>

        <Alert color="warning" isOpen={this.state.warning} toggle={this.warningDismiss}>
          <span className="announcement-header">Coins to strongly avoid!</span>
          <ul className="announcements-container">
            <li>Tether (USDT)</li>
            <li>Bitconnect (BCC)</li>
          </ul>
        </Alert>
      </div>
    )
  }
}

export default Announcements
