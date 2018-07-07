import { fetchUsers as apiFetchUsers } from '../../actions/user';

export { deleteUser } from '../../actions/user';

export function fetchUsers(query) {
  return async (dispatch) => await dispatch(apiFetchUsers({ ...query, query }));
}
