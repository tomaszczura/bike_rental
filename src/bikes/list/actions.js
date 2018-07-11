import { fetchBikes as apiFetchBikes } from '../../actions/bike';

export function fetchBikes(query) {
  return async (dispatch) => dispatch(apiFetchBikes({ ...query, onlyAvailable: true, query }));
}
