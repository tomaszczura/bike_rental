import { fromJS } from 'immutable';
import * as appActions from '../actions';
import * as bikeActions from '../actions/bike';

export default (state = fromJS({
  showSnackbar: false,
  snackbarMessage: ''
}), action) => {
  switch (action.type) {
    case appActions.SNACKBAR_OPEN:
      return state.set('snackbarOpened', true).set('snackbarMessage', action.message);
    case appActions.SNACKBAR_CLOSE:
      return state.set('snackbarOpened', false).set('snackbarMessage', '');
    case bikeActions.CREATE_BIKE_BOOKING_SUCCESS:
      return state.set('snackbarOpened', true).set('snackbarMessage', 'Bike has been booked!');
    default:
      return state;
  }
};
