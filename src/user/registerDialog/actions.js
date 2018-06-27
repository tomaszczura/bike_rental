import { registerUser as dataRegisterUser, handleLogin } from '../../actions/user';

export function registerUser(params) {
  return async (dispatch) => {
    const user = await dispatch(dataRegisterUser(params));
    handleLogin(user);
  };
}
