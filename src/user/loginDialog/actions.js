import { handleLogin, loginUser as dataLoginUser } from '../../actions/user';

export function loginUser(params) {
  return async (dispatch) => {
    const user = await dispatch(dataLoginUser(params));
    handleLogin(user);
  };
}
