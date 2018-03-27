import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions/userActions'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class ProfileDropdown extends Component {
  handleLogout = () => {
    this.props.logoutUser()
    this.props.history.push('/')
  }

  render() {
    return (
      <UncontrolledDropdown nav innavbar="true">
        <DropdownToggle nav caret className="nav-profile">
          <img className="navbar-user-icon" src={this.props.user.googlePhotos} alt="x" />
        </DropdownToggle>
        <DropdownMenu>
          <Link to="/profile">
            <DropdownItem>
              Profile
            </DropdownItem>
          </Link>
          <DropdownItem divider />
            <DropdownItem onClick={this.handleLogout}>
              Logout
            </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

function mapStateToProps({ user }) {
  return { user }
}

export default withRouter(connect(mapStateToProps, actions)(ProfileDropdown))
