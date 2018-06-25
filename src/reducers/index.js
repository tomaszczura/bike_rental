import { combineReducers, createStore } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form/immutable';

export const store = createStore(
  combineReducers({
    form,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
