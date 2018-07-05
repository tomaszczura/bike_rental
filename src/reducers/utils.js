import { fromJS } from 'immutable';
import hash from 'object-hash';
import { ERROR, LOADING, LOADED } from '../constants/status';

export function hashQuery(query) {
  return hash(query);
}

export function relationsDataFetchStart(state, path, key) {
  return state.setIn(['relations', path, key], fromJS({ status: LOADING }));
}

export function relationsDataFetchSuccess(state, path, entityPath, key, data) {
  let newState = state;
  data.data.forEach((d) => {
    newState = newState.setIn(['entities', entityPath, d.id], fromJS(d));
  });
  newState = newState.setIn(['relations', path, key, 'data'], fromJS(data.data.map((d) => d.id)))
    .setIn(['relations', path, key, 'status'], LOADED)
    .setIn(['relations', path, key, 'page'], data.page)
    .setIn(['relations', path, key, 'pageSize'], data.pageSize)
    .setIn(['relations', path, key, 'totalPages'], data.totalPages)
    .setIn(['relations', path, key, 'totalCount'], data.totalCount);
  return newState;
}

export function relationsDataFetchError(state, path, key, error) {
  return state.setIn(['relations', path, key], fromJS({ status: ERROR, error }));
}
