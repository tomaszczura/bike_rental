import { authHeaders, http, prepareSearchPageParams } from './utils';
import { transformUser, transformUserProfile } from '../transformers/user';

export async function registerUser({ login, password, passwordConfirmation }) {
  const params = {
    email: login,
    password,
    password_confirmation: passwordConfirmation
  };
  const body = await http.post('/users/register', params);
  return transformUserProfile(body.data);
}

export async function loginUser({ login, password }) {
  const params = {
    email: login,
    password
  };
  const body = await http.post('/users/login', params);

  return transformUserProfile(body.data);
}

export async function fetchCurrentUser() {
  const body = await http.get('/users/profile', authHeaders());
  return transformUserProfile(body.data);
}

export async function fetchUsers({ page = 0, pageSize = 25, order, orderBy, search }) {
  const url = `/users?${prepareSearchPageParams({ page, pageSize, order, orderBy, search })}`;
  const { data } = await http.get(url, authHeaders());
  data.data = data.data.map(transformUser);
  return data;
}

export async function persistUser({ id, email, password, passwordConfirmation, role }) {
  let url = '/users';
  let method = http.post;
  if (id) {
    url = `${url}/${id}`;
    method = http.put;
  }
  const params = {
    email,
    password,
    password_confirmation: passwordConfirmation,
    role
  };

  const body = await method(url, params, authHeaders());
  return transformUser(body.data);
}

export async function deleteUser({ userId }) {
  const url = `/users/${userId}`;
  await http.delete(url, authHeaders());
}
