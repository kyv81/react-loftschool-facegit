import followers, {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
} from './followers';

const INIT_STATE = {
  isFetching: false,
  ids: [],
  error: null,
};
const payload = 'some payload';

describe('Редьюсер followers', () => {
  describe('fetchFollowersRequest', () => {
    const state = followers(INIT_STATE, fetchFollowersRequest());

    it('изменяет флаг isFetching', () => {
      expect(state.isFetching).toEqual(true);
    });
    it('очищает поле ids', () => {
      expect(state.ids).toEqual([]);
    });
    it('очищает поле error', () => {
      expect(state.error).toEqual(null);
    });
  });

  describe('fetchFollowersSuccess', () => {
    const state = followers(INIT_STATE, fetchFollowersSuccess(payload));

    it('изменяет флаг isFetching', () => {
      expect(state.isFetching).toEqual(false);
    });
    it('наполняет данными ids', () => {
      expect(state.ids).toEqual(payload);
    });
    it('очищает поле error', () => {
      expect(state.error).toEqual(null);
    });
  });

  describe('fetchFollowersFailure', () => {
    const state = followers(INIT_STATE, fetchFollowersFailure(payload));

    it('изменяет флаг isFetching', () => {
      expect(state.isFetching).toEqual(false);
    });
    it('наполняет данными error', () => {
      expect(state.error).toEqual(payload);
    });
  });
});
