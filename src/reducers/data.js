import { fromJS } from 'immutable';
import * as userActions from '../actions/user';
import * as bikeActions from '../actions/bike';
import {
  fetchEntityError,
  fetchEntityStart, fetchEntitySuccess,
  hashQuery,
  relationsDataFetchError,
  relationsDataFetchStart,
  relationsDataFetchSuccess
} from './utils';

export default (state = fromJS({
  profile: {},
  entities: {
    bikes: {},
    users: {},
    bookings: {}
  },
  relations: {
    bikeHasBookings: {},
    queryHasBikes: {},
    queryHasUsers: {},
    userHasBookings: {}
  }
}), action) => {
  switch (action.type) {
    case userActions.LOGIN_USER_SUCCESS:
    case userActions.REGISTER_USER_SUCCESS:
    case userActions.USER_PROFILE_FETCH_SUCCESS:
      return state.set('profile', fromJS(action.data.profile));

    case userActions.LOGOUT_USER:
      return state.set('profile', fromJS({}));

    case userActions.FETCH_USERS_START:
      return relationsDataFetchStart(state, 'queryHasUsers', hashQuery(action.query));
    case userActions.FETCH_USERS_SUCCESS:
      return relationsDataFetchSuccess(state, 'queryHasUsers', 'users', hashQuery(action.query), action.data);
    case userActions.FETCH_USERS_ERROR:
      return relationsDataFetchError(state, 'queryHasUsers', hashQuery(action.query), action.error);

    case bikeActions.FETCH_BIKES_START:
      return relationsDataFetchStart(state, 'queryHasBikes', hashQuery(action.query));
    case bikeActions.FETCH_BIKES_SUCCESS:
      return relationsDataFetchSuccess(state, 'queryHasBikes', 'bikes', hashQuery(action.query), action.data);
    case bikeActions.FETCH_BIKES_ERROR:
      return relationsDataFetchError(state, 'queryHasBikes', hashQuery(action.query), action.error);

    case bikeActions.FETCH_BIKE_START:
      return fetchEntityStart(state, 'bikes', action.bikeId);
    case bikeActions.FETCH_BIKE_SUCCESS:
      return fetchEntitySuccess(state, 'bikes', action.data);
    case bikeActions.FETCH_BIKE_ERROR:
      return fetchEntityError(state, 'bikes', action.bikeId, action.error);

    case bikeActions.FETCH_BIKES_BOOKINGS_START:
      return relationsDataFetchStart(state, 'bikeHasBookings', hashQuery(action.query));
    case bikeActions.FETCH_BIKES_BOOKINGS_SUCCESS:
      return relationsDataFetchSuccess(state, 'bikeHasBookings', 'bookings', hashQuery(action.query), action.data);
    case bikeActions.FETCH_BIKES_BOOKINGS_ERROR:
      return relationsDataFetchError(state, 'bikeHasBookings', hashQuery(action.query), action.error);

    case userActions.FETCH_USER_BOOKINGS_START:
      return relationsDataFetchStart(state, 'userHasBookings', hashQuery(action.query));
    case userActions.FETCH_USER_BOOKINGS_SUCCESS:
      return relationsDataFetchSuccess(state, 'userHasBookings', 'bookings', hashQuery(action.query), action.data);
    case userActions.FETCH_USER_BOOKINGS_ERROR:
      return relationsDataFetchError(state, 'userHasBookings', hashQuery(action.query), action.error);

    default:
      return state;
  }
};
