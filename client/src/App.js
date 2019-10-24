import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions/userActions'

import './App.css';

import Coin from './components/Coin'
import Contact from './components/Contact'
import Disclaimer from './components/Disclaimer'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Subnav from './components/Subnav'
import User from './components/User'
import UserPublicView from './components/UserPublicView'

// import PrivateRoute from './components/PrivateRoute'

class App extends Component {
  componentDidMount() {
    this.props.authenticate()
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
            <Route path="/disclaimer" component={ Disclaimer } />
            <Route path="/profile" component={ User } />
            <Route path="/view/:username" component={ UserPublicView } />
          </div>
          <Route path="/contact" component={ Contact } />
          <Route path="/info/:id" component={ Coin } />
          <Route path="/faq" component={ Faq } />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
