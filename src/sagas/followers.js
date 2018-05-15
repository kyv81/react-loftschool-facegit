import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
} from 'ducks/followers';
import { getUserFollowers } from 'api';

export function* fetchFollowersSaga(action) {
  try {
    const response = yield call(getUserFollowers, action.payload);
    yield put(fetchFollowersSuccess(response.data));
  } catch (error) {
    yield put(fetchFollowersFailure(error));
  }
}

export function* fetchFollowersWatch() {
  yield takeLatest(fetchFollowersRequest, fetchFollowersSaga);
}
