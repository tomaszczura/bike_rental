import { fetchBikes as apiFetchBikes } from '../../actions/bike';

export function fetchBikes(query) {
  return async (dispatch) => await dispatch(apiFetchBikes({ ...query, onlyAvailable: true, query }));
}
