import { fromJS } from 'immutable';
import hash from 'object-hash';
import { ERROR, LOADING, LOADED } from '../constants/status';

export function hashQuery(query) {
  return hash(query);
}

export function fetchEntityStart(state, name, id) {
  return state.setIn(['entities', name, id.toString(), 'status'], LOADING)
    .deleteIn(['entities', name, id.toString(), 'error']);
}

export function fetchEntitySuccess(state, name, data) {
  return state.setIn(['entities', name, data.id.toString(), 'status'], LOADED)
    .deleteIn(['entities', name, data.id.toString(), 'error'])
    .mergeIn(['entities', name, data.id.toString()], fromJS(data));
}

export function fetchEntityError(state, name, id, error) {
  return state.setIn(['entities', name, id.toString(), 'status'], ERROR)
    .setIn(['entities', name, id.toString(), 'error'], error);
}

export function relationsDataFetchStart(state, path, key) {
  return state.setIn(['relations', path, key], fromJS({ status: LOADING }));
}

export function relationsDataFetchSuccess(state, path, entityPath, key, data) {
  let newState = state;
  data.data.forEach((d) => {
    newState = newState.setIn(['entities', entityPath, d.id.toString()], fromJS(d))
      .setIn(['entities', entityPath, d.id.toString(), 'status'], LOADED);
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
