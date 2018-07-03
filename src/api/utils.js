import axios from 'axios';
import * as session from '../utils/session';

export const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000
});

export function authHeaders() {
  const user = session.getSavedUser();
  if (user) {
    return {
      headers: {
        token: user.token,
        email: user.email
      }
    };
  }
  return {
    headers: {}
  };
}

export function apiAction(_apiCall, startActionType, successActionType, errorActionType) {
  return params => async (dispatch) => {
    dispatch({ ...params, type: startActionType });
    try {
      const data = await _apiCall(params);
      dispatch({ ...params, data, type: successActionType });
      return data;
    } catch (error) {
      dispatch({ ...params, error, type: errorActionType });
      throw error;
    }
  };
}
