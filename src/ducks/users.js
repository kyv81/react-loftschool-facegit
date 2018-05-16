import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchTokenRequest,
} = createActions(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE',
  'FETCH_TOKEN_REQUEST',
);

const isFetching = handleActions(
  {
    [fetchUserRequest]: () => true,
    [fetchTokenRequest]: () => true,
    [fetchUserSuccess]: () => false,
    [fetchUserFailure]: () => false,
  },
  false,
);

const data = handleActions(
  {
    [fetchUserRequest]: () => null,
    [fetchUserSuccess]: (state, action) => action.payload,
  },
  null,
);

const error = handleActions(
  {
    [fetchUserRequest]: () => null,
    [fetchUserSuccess]: () => null,
    [fetchUserFailure]: (state, action) => action.payload,
  },
  null,
);

export default combineReducers({
  isFetching,
  data,
  error,
});

export const getIsFetching = state => state.users.isFetching;
export const getData = state => state.users.data;
export const getError = state => state.users.error;
