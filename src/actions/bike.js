import { apiAction } from '../api/utils';
import * as api from '../api/bike';

export const PERSIST_BIKE_START = 'BIKE/PERSIST_BIKE_START';
export const PERSIST_BIKE_SUCCESS = 'BIKE/PERSIST_BIKE_SUCCESS';
export const PERSIST_BIKE_ERROR = 'BIKE/PERSIST_BIKE_ERROR';

export const FETCH_BIKES_START = 'BIKE/FETCH_BIKES_START';
export const FETCH_BIKES_SUCCESS = 'BIKE/FETCH_BIKES_SUCCESS';
export const FETCH_BIKES_ERROR = 'BIKE/FETCH_BIKES_ERROR';

export const persistBike = apiAction(api.persistBike, PERSIST_BIKE_START, PERSIST_BIKE_SUCCESS, PERSIST_BIKE_ERROR);
export const fetchBikes = apiAction(api.fetchBikes, FETCH_BIKES_START, FETCH_BIKES_SUCCESS, FETCH_BIKES_ERROR);
