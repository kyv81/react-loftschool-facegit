import users, { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './users';

const INIT_STATE = {
  isFetching: false,
  data: null,
  error: null,
};
const payload = 'some payload';

describe('Редьюсер users', () => {
  describe('fetchUserRequest', () => {
    const state = users(INIT_STATE, fetchUserRequest());

    it('изменяет флаг isFetching', () => {
      expect(state.isFetching).toEqual(true);
    });
    it('очищает поле data', () => {
      expect(state.data).toEqual(null);
    });
    it('очищает поле error', () => {
      expect(state.error).toEqual(null);
    });
  });

  describe('fetchUserSuccess', () => {
    const state = users(INIT_STATE, fetchUserSuccess(payload));

    it('изменяет флаг isFetching', () => {
      expect(state.isFetching).toEqual(false);
    });
    it('наполняет данными data', () => {
      expect(state.data).toEqual(payload);
    });
    it('очищает поле error', () => {
      expect(state.error).toEqual(null);
    });
  });

  describe('fetchUserFailure', () => {
    const state = users(INIT_STATE, fetchUserFailure(payload));

    it('изменяет флаг isFetching', () => {
      expect(state.isFetching).toEqual(false);
    });
    it('наполняет данными error', () => {
      expect(state.error).toEqual(payload);
    });
  });
});
