import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './ducks';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const sagaMiddleware = createSagaMiddleware();

export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(logger, sagaMiddleware),
      window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
