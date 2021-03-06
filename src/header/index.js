import React, { Component } from 'react';
import './index.scss';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import UserMenu from './userMenu';
import selector from './selector';
import { UserRoles } from '../constants/userRoles';

@connect(selector)
export default class Header extends Component {
  static propTypes = {
    userProfile: ImmutablePropTypes.map
  };

  render() {
    const { userProfile } = this.props;
    const activeStyle = { backgroundColor: '#388E3C' };
    const isManager = userProfile.get('role') === UserRoles.MANAGER;
    const isAuthenticated = Boolean(userProfile.get('id'));

    return (
      <header className='header'>
        <h1>Bike rental</h1>
        <div>
          {isAuthenticated && <Button activeStyle={activeStyle} component={Link} to='/bikes'>Bikes</Button>}
          {isManager && <Button activeStyle={activeStyle} component={Link} to='/manage-bikes'>Manage Bikes</Button>}
          {isManager && <Button activeStyle={activeStyle} component={Link} to='/manage-users'>Manage Users</Button>}
        </div>
        {isAuthenticated &&
          <div>
            <UserMenu userProfile={userProfile}/>
          </div>
        }
      </header>
    );
  }
}
