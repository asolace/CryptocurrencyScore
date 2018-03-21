import React from 'react'
import { Link } from 'react-router-dom'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const ProfileDropdown = () =>
  <UncontrolledDropdown nav innavbar="true">
    <DropdownToggle nav caret className="nav-profile">
      <img className="navbar-user-icon" src={this.props.auth.googlePhotos} alt="x" />
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

  export default ProfileDropdown
