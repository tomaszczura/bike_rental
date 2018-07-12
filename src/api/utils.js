import axios from 'axios';
import * as session from '../utils/session';

export const serverDateFormat = 'YYYY-MM-DD';

export const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000
});

export function authHeaders(headers) {
  const user = session.getSavedUser();
  if (user) {
    return {
      headers: {
        ...headers,
        token: user.token,
        email: user.email
      }
    };
  }
  return {
    headers
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

export function prepareSearchPageParams(params) {
  const { page, pageSize, order, orderBy, search } = params;
  let query = `page=${parseInt(page, 0) + 1}&pageSize=${pageSize}`;

  if (orderBy && ['asc', 'desc'].includes(order)) {
    query = `${query}&sortBy=${orderBy}&sortDir=${order.toUpperCase()}`;
  }

  if (search) {
    query = `${query}&search=${encodeURIComponent(search)}`;
  }

  return query;
}
