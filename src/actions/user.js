import { apiAction } from '../api/utils';
import * as api from '../api/user';
import * as session from '../utils/session';

export const REGISTER_USER_START = 'USER/REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'USER/REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'USER/REGISTER_USER_ERROR';

export const LOGIN_USER_START = 'USER/LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'USER/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'USER/LOGIN_USER_ERROR';

export const USER_PROFILE_FETCH_START = 'USER/USER_PROFILE_FETCH_START';
export const USER_PROFILE_FETCH_SUCCESS = 'USER/USER_PROFILE_FETCH_SUCCESS';
export const USER_PROFILE_FETCH_ERROR = 'USER/USER_PROFILE_FETCH_ERROR';

export const LOGOUT_USER = 'USER/LOGOUT_USER';

export const registerUser = apiAction(api.registerUser, REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR);
export const loginUser = apiAction(api.loginUser, LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR);
export const fetchUser = apiAction(api.fetchCurrentUser, USER_PROFILE_FETCH_START, USER_PROFILE_FETCH_SUCCESS, USER_PROFILE_FETCH_ERROR);

export function handleLogin(user) {
  session.saveUser(user);
}

export function logoutUser() {
  return async (dispatch) => {
    session.clearUser();
    dispatch({ type: LOGOUT_USER });
  };
}
