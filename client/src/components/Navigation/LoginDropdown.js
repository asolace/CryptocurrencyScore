import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const LoginDropdown = () =>
  <UncontrolledDropdown nav innavbar="true">
    <DropdownToggle nav caret className="nav-login">
      Login
    </DropdownToggle>
    <DropdownMenu >
      <a href="/auth/google">
        <DropdownItem>
          Google
        </DropdownItem>
      </a>
      <DropdownItem divider />
      <DropdownItem disabled className="coinbase-login">
        Coinbase
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>

export default LoginDropdown
