import { fromJS } from 'immutable';
import * as userActions from '../actions/user';

export default (state = fromJS({
  profile: {}
}), action) => {
  switch (action.type) {
    case userActions.LOGIN_USER_SUCCESS:
    case userActions.REGISTER_USER_SUCCESS:
    case userActions.USER_PROFILE_FETCH_SUCCESS:
      return state.set('profile', fromJS(action.data.profile));

    case userActions.LOGOUT_USER:
      return state.set('profile', fromJS({}));

    default:
      return state;
  }
};
