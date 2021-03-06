import { fetchBikes as apiFetchBikes } from '../../../actions/bike';

export { deleteBike } from '../../../actions/bike';

export function fetchBikes(query) {
  return async (dispatch) => await dispatch(apiFetchBikes({ ...query, query }));
}
