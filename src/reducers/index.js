import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form/immutable';

export function createCustomStore(history) {
  const middleware = [];
  middleware.push(routerMiddleware(history));
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  return newCreateStore(
    combineReducers({
      form,
      routing: routerReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
