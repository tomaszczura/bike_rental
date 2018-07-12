import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as actions from '../../actions/user';
import selector from '../selector';

@connect(selector, dispatch => ({
  logoutUser: bindActionCreators(actions.logoutUser, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
export default class UserMenu extends Component {
  static propTypes = {
    logoutUser: PropTypes.func,
    routerPush: PropTypes.func,
    userProfile: ImmutablePropTypes.map
  };

  state = {
    anchorEl: null,
  };

  onLogoutClick = () => {
    this.handleClose();
    this.props.logoutUser();
    this.props.routerPush('/login');
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleBookingsClick = () => {
    this.handleClose();
    this.props.routerPush(`/users/${this.props.userProfile.get('id')}/bookings`);
  };

  render() {
    const { userProfile } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Button onClick={this.handleClick}>{userProfile.get('email', 'User')}</Button>
        <Menu id='userMenu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleBookingsClick}>Bookings</MenuItem>
          <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
