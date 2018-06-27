import React, { Component } from 'react';
import './index.scss';

export default class Header extends Component {
  static propTypes = {};

  render() {
    return (
      <header className='header'>
        <h1>Bike rental</h1>
      </header>
    );
  }
}
