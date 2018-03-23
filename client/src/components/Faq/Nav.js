import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <div className="how-it-works-nav">
        <Nav className="container">
          <NavItem>
            <NavLink href="#">What's it for?</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">How does it work?</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
