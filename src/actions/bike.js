import { apiAction } from '../api/utils';
import * as api from '../api/bike';

export const PERSIST_BIKE_START = 'BIKE/PERSIST_BIKE_START';
export const PERSIST_BIKE_SUCCESS = 'BIKE/PERSIST_BIKE_SUCCESS';
export const PERSIST_BIKE_ERROR = 'BIKE/PERSIST_BIKE_ERROR';

export const persistBike = apiAction(api.persistBike, PERSIST_BIKE_START, PERSIST_BIKE_SUCCESS, PERSIST_BIKE_ERROR);
