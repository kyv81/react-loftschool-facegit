import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const { authorize, logout } = createActions('AUTHORIZE', 'LOGOUT');

const isAuthorized = handleActions(
  {
    [authorize]: () => true,
    [logout]: () => false,
  },
  false,
);

export default combineReducers({
  isAuthorized,
});

export const getIsAuthorized = state => state.auth.isAuthorized;
