import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const { clearNetworkErrors, networkError } = createActions(
  'CLEAR_NETWORK_ERRORS',
  'NETWORK_ERROR',
);

const error = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: (state, action) => action.payload,
  },
  null,
);

const message = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: (state, action) => action.payload,
  },
  null,
);

export default combineReducers({
  error,
  message,
});

export const getIsNetworkErrorPresent = state => state.network.error;
export const getNetworkError = state => state.network.message;
