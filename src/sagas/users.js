import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchTokenRequest,
} from 'ducks/users';
import { getTokenOwner, getUserInformation } from 'api';
import requestFlow from './request';

export function* fetchUserSaga(action) {
  try {
    let response;
    if (fetchTokenRequest.toString() === action.type) {
      response = yield call(requestFlow, getTokenOwner, action.payload);
    } else {
      response = yield call(requestFlow, getUserInformation, action.payload);
    }
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

export function* fetchUserWatch() {
  yield takeLatest([fetchUserRequest, fetchTokenRequest], fetchUserSaga);
}
