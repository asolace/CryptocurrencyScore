import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav , NavItem } from 'reactstrap'

import LoginDropdown from './LoginDropdown'
import ProfileDropdown from './ProfileDropdown'

import trade from '../../assets/trade.png'

class Navigation extends Component {
  state = {
    isOpen: false
  }

  toggle = () => this.setState({  isOpen: !this.state.isOpen })

  render() {
    const HomeURL = process.env.NODE_ENV === "development" ? "/" : "https://cryptocurrency-score.herokuapp.com/"

    return (
      <Navbar className="main-nav" color="faded" light expand="md" id="nav">
        <NavbarBrand href={HomeURL}>
          <span className="brand">
            <img src={trade} className="brand-img" alt="brand"/>
          </span>
          <span className="title-full">Cryptocurrency Score</span>
          <span className="title-short">CCScore</span>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />

        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/*<NavItem>
              <Link to="/faq">FAQ</Link>
            </NavItem>

            <NavItem>
              <Link to="/resources">Resources</Link>
            </NavItem>*/}

            {this.props.user ?
              <ProfileDropdown /> :
              <LoginDropdown />
            }

          </Nav>
        </Collapse>
      </Navbar>
    )
  }

}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps)(Navigation)
