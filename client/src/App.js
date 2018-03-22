import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css';

import Announcements from './components/Announcements'
import Navigation from './components/Navigation'
import Subnav from './components/Subnav'
const Home = () => <div>Home</div>


class App extends Component {
  render() {
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

export default App;
