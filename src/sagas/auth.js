import { call, put, select, take } from 'redux-saga/effects';
import { authorize, getIsAuthorized, logout } from 'ducks/auth';
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setTokenToLocalStorage,
} from 'localStorage';
import { clearTokenApi, setTokenApi } from 'api';

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token;

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
        yield put(authorize());
      } else {
        const action = yield take(authorize);
        token = action.payload;
      }
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
