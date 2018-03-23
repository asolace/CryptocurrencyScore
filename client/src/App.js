import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions/userActions'

import './App.css';

import Navigation from './components/Navigation'
import Subnav from './components/Subnav'
import Home from './components/Home'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Subnav />
          <div className="container body">
            <Route exact path="/" component={ Home } />
            <Route exact path="/c/:page" component={ Home } />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
