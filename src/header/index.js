import React, { Component } from 'react';
import { Button } from '@material-ui/core/es/index';
import './index.scss';
import LoginDialog from '../user/loginDialog';

export default class Header extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      showLoginDialog: false,
      showRegisterDialog: false
    };
  }

  onLoginClick = () => {
    this.setState({
      showLoginDialog: true
    });
  }

  onLoginClose = () => {
    this.setState({
      showLoginDialog: false
    });
  }

  onRegisterClick = () => {
    this.setState({
      showRegisterDialog: true
    });
  }

  render() {
    const { showRegisterDialog, showLoginDialog } = this.state;

    return (
      <header className='header'>
        <h1>Bike rental</h1>
        <div className='header-buttons'>
          <Button color='primary' variant='contained' onClick={this.onLoginClick}>Sign in</Button>
          <Button variant='contained' onClick={this.onRegisterClick}>Sign up</Button>
        </div>
        {showLoginDialog && <LoginDialog onClose={this.onLoginClose}/>}
      </header>
    );
  }
}
