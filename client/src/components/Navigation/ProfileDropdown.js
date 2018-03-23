import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions/userActions'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class ProfileDropdown extends Component {
  render() {
    return (
      <UncontrolledDropdown nav innavbar="true">
        <DropdownToggle nav caret className="nav-profile">
          <img className="navbar-user-icon" src={this.props.user.googlePhotos} alt="x" />
        </DropdownToggle>
        <DropdownMenu>
          <Link to="/u/profile">
            <DropdownItem className="google-login">
              Profile
            </DropdownItem>
          </Link>
          <DropdownItem divider />
          <a href="/api/logout">
            <DropdownItem className="google-login">
              Logout
            </DropdownItem>
          </a>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps, actions)(ProfileDropdown)
