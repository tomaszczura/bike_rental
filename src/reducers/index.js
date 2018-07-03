import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form/immutable';
import dataReducer from './data';

export function createCustomStore(history) {
  const middleware = [];
  middleware.push(thunkMiddleware);
  middleware.push(routerMiddleware(history));
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  return newCreateStore(
    combineReducers({
      form,
      data: dataReducer,
      router,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
