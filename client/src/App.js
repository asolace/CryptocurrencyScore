import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions/userActions'

import './App.css';

import Announcements from './components/Announcements'
import Navigation from './components/Navigation'
import Subnav from './components/Subnav'
const Home = () => <div>Home</div>


class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    console.log(this.props.user);
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Subnav />
          <div className="container body">
            <Announcements />
            <Route exact path="/" component={ Home } />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return { auth, user }
}

export default connect(mapStateToProps, actions)(App);
