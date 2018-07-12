import { fetchBikeBookings as dataFetchBikeBookings } from '../../../actions/bike';

export { deleteBikeBooking } from '../../../actions/bike';

export function fetchBikeBookings(bikeId, query) {
  return async (dispatch) => {
    await dispatch(dataFetchBikeBookings({ bikeId, ...query, query }));
  };
}
