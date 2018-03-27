import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from '../Loading'

class User extends Component {
  state = {}

  render() {
    if (this.props.user) {
      const { username } = this.props.user
      return (
        <div>
          <h1>{ username }</h1>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps)(User)
