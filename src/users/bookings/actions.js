import { fetchUserBookings as dataFetchUserBookings } from '../../actions/user';

export function fetchUserBookings(userId, query) {
  return async (dispatch) => {
    await dispatch(dataFetchUserBookings({ userId, ...query, query }));
  };
}
