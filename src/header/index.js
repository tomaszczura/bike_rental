import React, { Component } from 'react';
import { Button } from '@material-ui/core/es/index';
import './index.scss';

export default class Header extends Component {
  static propTypes = {};

  render() {
    return (
      <div className='header'>
        <h1>Bike rental</h1>
        <div className='header-buttons'>
          <Button color='primary' variant='contained'>Sign in</Button>
          <Button variant='contained'>Sign up</Button>
        </div>
      </div>
    );
  }
}
