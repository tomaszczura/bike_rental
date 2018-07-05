import { fromJS } from 'immutable';
import * as userActions from '../actions/user';
import * as bikeActions from '../actions/bike';
import { hashQuery, relationsDataFetchError, relationsDataFetchStart, relationsDataFetchSuccess } from './utils';

export default (state = fromJS({
  profile: {},
  entities: {
    bikes: {}
  },
  relations: {
    queryHasBikes: {}
  }
}), action) => {
  switch (action.type) {
    case userActions.LOGIN_USER_SUCCESS:
    case userActions.REGISTER_USER_SUCCESS:
    case userActions.USER_PROFILE_FETCH_SUCCESS:
      return state.set('profile', fromJS(action.data.profile));

    case userActions.LOGOUT_USER:
      return state.set('profile', fromJS({}));

    case bikeActions.FETCH_BIKES_START:
      return relationsDataFetchStart(state, 'queryHasBikes', hashQuery(action.query));
    case bikeActions.FETCH_BIKES_SUCCESS:
      return relationsDataFetchSuccess(state, 'queryHasBikes', 'bikes', hashQuery(action.query), action.data);
    case bikeActions.FETCH_BIKES_ERROR:
      return relationsDataFetchError(state, 'queryHasBikes', hashQuery(action.query), action.error);

    default:
      return state;
  }
};
