import network, { clearNetworkErrors, networkError } from './network';

const INIT_STATE = {
  error: null,
  message: null,
};
const payload = 'some payload';

describe('Редьюсер network', () => {
  describe('clearNetworkErrors', () => {
    const state = network(INIT_STATE, clearNetworkErrors());

    it('очищает поле error', () => {
      expect(state.error).toEqual(null);
    });
    it('очищает поле message', () => {
      expect(state.message).toEqual(null);
    });
  });

  describe('networkError', () => {
    const state = network(INIT_STATE, networkError(payload));

    it('наполняет данными error', () => {
      expect(state.error).toEqual(payload);
    });
    it('наполняет данными message', () => {
      expect(state.message).toEqual(payload);
    });
  });
});
