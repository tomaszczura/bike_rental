import { apiAction } from '../api/utils';
import * as api from '../api/user';
import * as session from '../utils/session';

export const REGISTER_USER_START = 'USER/REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'USER/REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'USER/REGISTER_USER_ERROR';

export const LOGIN_USER_START = 'USER/LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'USER/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'USER/LOGIN_USER_ERROR';

export const registerUser = apiAction(api.registerUser, REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR);
export const loginUser = apiAction(api.loginUser, LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR);

export function handleLogin(user) {
  session.saveUser(user);
}
