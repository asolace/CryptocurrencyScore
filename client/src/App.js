import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css';

import Navigation from './components/Navigation'
const Home = () => <div>Home</div>


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <div className="container body">
            <Route exact path="/" component={ Home } />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
