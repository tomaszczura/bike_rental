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
import UsersBookingList from './users/bookings';
import BikeDetails from './bikes/read';

// eslint-disable-next-line no-unused-vars
export const getRoutes = ({ dispatch, getState }) => {
  function requireAuthenticated() {
    return (nextState, replace) => {
      if (!session.getSavedUser()) {
        return replace('/login');
      }
    };
  }

  function requireCurrentUserOrManager() {
    return (nextState, replace) => {
      const user = session.getSavedUser();
      if (!user) {
        return replace('/login');
      }

      const routeUserId = parseInt(nextState.params.userId, 10);
      if (routeUserId !== user.id && user.role !== UserRoles.MANAGER) {
        return replace(`/${user.id}/bookings`);
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
      <Route path='/bikes/:bikeId' component={BikeDetails} onEnter={requireAuthenticated()}/>
      <Route path='/users/:userId/bookings' component={UsersBookingList} onEnter={requireCurrentUserOrManager()}/>
      <Route path='/manage-bikes' component={BikesManageList} onEnter={requireAuthenticatedManager()}/>
      <Route path='/manage-users' component={UsersManageList} onEnter={requireAuthenticatedManager()}/>
      <Redirect from='*' to='/'/>
    </Route>
  );
};
