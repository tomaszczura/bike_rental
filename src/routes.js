/* eslint-disable react/prop-types */
import React from 'react';
import { IndexRedirect, Redirect, Route } from 'react-router';
import App from './app';
import * as session from './utils/session';
import LoginDialog from './user/loginDialog';
import BikesList from './bikes/list';
import RegisterDialog from './user/registerDialog';

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

  return (
    <Route component={App} path='/'>
      <IndexRedirect to='/bikes'/>
      <Route path='/login' component={LoginDialog} onEnter={requireNotAuthenticated()}/>
      <Route path='/register' component={RegisterDialog} onEnter={requireNotAuthenticated()}/>
      <Route path='/bikes' component={BikesList} onEnter={requireAuthenticated()}/>
      <Redirect from='*' to='/'/>
    </Route>
  );
};
