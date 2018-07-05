import { fetchBikes as apiFetchBikes } from '../../../actions/bike';

export function fetchBikes(query) {
  return async (dispatch) => {
    return await dispatch(apiFetchBikes({ query }));
  };
}
