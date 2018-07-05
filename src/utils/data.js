import { LOADED, LOADING } from '../constants/status';

export function isLoading(data) {
  return data && data.get('status', LOADING) === LOADING;
}

export function isLoaded(data) {
  return data && data.get('status') === LOADED;
}
