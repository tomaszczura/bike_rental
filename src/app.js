import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import './styles/common.scss'

class App extends Component {
  static propTypes = {
    a: PropTypes.func
  };

  render() {
    return (
      <div className='test'> AThis is react a</div>
    );
  }
}

export default hot(module)(App);
