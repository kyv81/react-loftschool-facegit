import { call, put, select } from 'redux-saga/effects';
import { logout } from 'ducks/auth';
import { fetchFollowersSuccess } from 'ducks/followers';
import { clearNetworkErrors, getIsNetworkErrorPresent, networkError } from 'ducks/network';
import requestFlow from './request';

describe('Сага requestFlow', () => {
  const followers = [
    { id: 1, name: 'Yuriy' },
    { id: 2, name: 'Viktorovich' },
    { id: 3, name: 'Kurbakov' },
  ];
  const saga = requestFlow(fetchFollowersSuccess, followers);

  describe('Сценарий без ошибок', () => {
    it('call(fn, args)', () => {
      expect(saga.next().value).toEqual(call(fetchFollowersSuccess, followers));
    });
    it('select getIsNetworkErrorPresent', () => {
      expect(saga.next().value).toEqual(select(getIsNetworkErrorPresent));
    });
    it('put clearNetworkErrors', () => {
      expect(saga.next(true).value).toEqual(put(clearNetworkErrors()));
    });
  });

  describe('Сценарий с ошибкой', () => {
    it('put networkError', () => {
      const error = { response: { status: 401 } };
      expect(saga.throw(error).value).toEqual(put(networkError(error)));
    });
    it('put logout', () => {
      expect(saga.next().value).toEqual(put(logout()));
    });
  });
});
