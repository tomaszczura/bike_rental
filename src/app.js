import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './styles/common.scss';
import Header from './header';
import Main from './main';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default hot(module)(App);
