import React, { Component } from 'react'

import Nav from './Nav'

class Faq extends Component {
  render() {
    return (
      <div className="faq">
        <Nav />
        <hr />
        <div className="faq-header-container">
          <div className="faq-header">
            <h2>FAQ</h2>
            <h5>Community based cryptocurrency ranking to help others make better investment choices.</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default Faq
