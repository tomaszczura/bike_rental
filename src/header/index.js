import React, { Component } from 'react';
import './index.scss';
import UserMenu from './userMenu';
import * as session from '../utils/session';

export default class Header extends Component {
  static propTypes = {};

  render() {
    return (
      <header className='header'>
        <h1>Bike rental</h1>
        {session.getSavedUser() &&
          <div>
            <UserMenu/>
          </div>
        }
      </header>
    );
  }
}
