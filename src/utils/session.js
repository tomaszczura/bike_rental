import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getSavedUser() {
  return cookies.get('session');
}

export function saveUser(user) {
  const dataToSave = {
    token: user.token,
    email: user.profile.email,
    role: user.profile.role
  };
  cookies.set('session', JSON.stringify(dataToSave), { path: '/' });
}

export function clearUser() {
  cookies.remove('session', { path: '/' });
}
