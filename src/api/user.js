import { http } from './utils';
import { transformUser } from '../transformers/user';

export async function registerUser({ login, password, passwordConfirmation }) {
  const params = {
    email: login,
    password,
    password_confirmation: passwordConfirmation
  };
  const body = await http.post('/users/register', params);
  return transformUser(body.data);
}

export async function loginUser({ login, password }) {
  const params = {
    email: login,
    password
  };
  const { body } = await http.post('/users/login', params);

  return transformUser(body.data);
}
