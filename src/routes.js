/* eslint-disable react/prop-types */
import React from 'react';
import { IndexRedirect, Redirect, Route } from 'react-router';
import App from './app';
import * as session from './utils/session';
import LoginDialog from './user/loginDialog';
import BikesList from './bikes/list';
import RegisterDialog from './user/registerDialog';
import { userProfileSelector } from './selectors/data';
import BikesManageList from './bikes/manage/list';
import UsersManageList from './users/list';
import { UserRoles } from './constants/userRoles';

// eslint-disable-next-line no-unused-vars
export const getRoutes = ({ dispatch, getState }) => {
  function requireAuthenticated() {
    return (nextState, replace) => {
      if (!session.getSavedUser()) {
        return replace('/login');
      }
    };
  }

  function requireNotAuthenticated() {
    return (nextState, replace) => {
      if (session.getSavedUser()) {
        return replace('/bikes');
      }
    };
  }

  function requireAuthenticatedManager() {
    return (nextState, replace) => {
      const user = userProfileSelector(getState());
      const savedUser = session.getSavedUser();
      if (user.get('role') !== UserRoles.MANAGER && savedUser.role !== UserRoles.MANAGER) {
        return replace('/bikes');
      } else {
        return requireAuthenticated();
      }
    };
  }

  return (
    <Route component={App} path='/'>
      <IndexRedirect to='/bikes'/>
      <Route path='/login' component={LoginDialog} onEnter={requireNotAuthenticated()}/>
      <Route path='/register' component={RegisterDialog} onEnter={requireNotAuthenticated()}/>
      <Route path='/bikes' component={BikesList} onEnter={requireAuthenticated()}/>
      <Route path='/manage-bikes' component={BikesManageList} onEnter={requireAuthenticatedManager()}/>
      <Route path='/manage-users' component={UsersManageList} onEnter={requireAuthenticatedManager()}/>
      <Redirect from='*' to='/'/>
    </Route>
  );
};
