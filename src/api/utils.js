import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export function apiAction(_apiCall, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      const state = getState();
      // const authenticationToken = authenticationTokenSelector(state);
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
  };
}
