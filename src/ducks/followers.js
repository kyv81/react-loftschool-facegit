import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
} = createActions('FETCH_FOLLOWERS_REQUEST', 'FETCH_FOLLOWERS_SUCCESS', 'FETCH_FOLLOWERS_FAILURE');

const isFetching = handleActions(
  {
    [fetchFollowersRequest]: () => true,
    [fetchFollowersSuccess]: () => false,
    [fetchFollowersFailure]: () => false,
  },
  false,
);

const ids = handleActions(
  {
    [fetchFollowersRequest]: () => [],
    [fetchFollowersSuccess]: (state, action) => action.payload,
  },
  [],
);

const error = handleActions(
  {
    [fetchFollowersRequest]: () => null,
    [fetchFollowersSuccess]: () => null,
    [fetchFollowersFailure]: (state, action) => action.payload,
  },
  null,
);

export default combineReducers({
  isFetching,
  ids,
  error,
});

export const getIsFetching = state => state.followers.isFetching;
export const getIds = state => state.followers.ids;
export const getError = state => state.followers.error;
