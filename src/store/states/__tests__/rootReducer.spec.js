import { createStore } from 'redux';
import { createReducer } from '../../rootReducer';

describe('rootReducer', () => {
  it('should have enough keys', () => {
    const store = createStore(createReducer(), {});

    expect(store.getState()).toEqual(expect.objectContaining({
      machineId: {},
      form: {},
      tiles: { input: [], positionMap: {} },
      sequence: { current: [] },
      resultList: [],
      toast: { notification: { shown: false }, alert: false },
    }));
  });
});
