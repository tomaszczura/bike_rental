import Cookies from 'universal-cookie';
import moment from 'moment';

const cookies = new Cookies();

export function getSavedUser() {
  return cookies.get('session');
}

export function saveUser(user) {
  const dataToSave = {
    token: user.token,
    email: user.profile.email,
    role: user.profile.role,
    id: user.profile.id
  };
  cookies.set('session', JSON.stringify(dataToSave), { path: '/', expires: moment().add(1, 'years').toDate() });
}

export function clearUser() {
  cookies.remove('session', { path: '/' });
}
