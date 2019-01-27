import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import arrayMiddleware from '../../middlewares/arrayMiddleware';

import {
  currentSequenceSelector,
  validateWord,
} from '../sequence';

import { resultListSelector } from '../resultList';

import {
  EXAMPLE_TILES,
  EXAMPLE_POSITION_MAP,
} from './mockData';

describe('sequence state', () => {
  it('should return correct tiles input', () => {
    const state = {
      sequence: {
        current: [1, 2, 3, 4],
      },
    };
    expect(currentSequenceSelector(state)).toEqual([1, 2, 3, 4]);
  });

  it('should validateWord in resultList yet', async () => {
    const initialState = {
      tiles: {
        input: EXAMPLE_TILES,
        positionMap: EXAMPLE_POSITION_MAP,
      },
      resultList: ['PASS'],
    };

    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore(initialState);

    const validation = await store.dispatch(validateWord('PASS'));

    expect(validation).toEqual({
      valid: false,
      error: 'Word is already chosen before',
    });

    expect(store.getActions()).toEqual([]);

    const state = store.getState();
    expect(resultListSelector(state)).toEqual(['PASS']);
  });

  it('should validateWord not combinable', async () => {
    const initialState = {
      tiles: {
        input: EXAMPLE_TILES,
        positionMap: EXAMPLE_POSITION_MAP,
      },
      resultList: [],
    };

    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore(initialState);

    const validation = await store.dispatch(validateWord('ACE'));

    expect(validation).toEqual({
      valid: false,
      error: 'Cannot combine this word',
    });

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'SEQUENCE/RESET' }),
    ]));
  });

  it('should validateWord combinable and update currentSequence', async () => {
    const initialState = {
      tiles: {
        input: EXAMPLE_TILES,
        positionMap: EXAMPLE_POSITION_MAP,
      },
      resultList: [],
      sequence: {
        current: [],
      },
    };

    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore(initialState);

    const validation = await store.dispatch(validateWord('PASS'));

    expect(validation).toEqual({
      valid: true,
      error: '',
    });

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'SEQUENCE/UPDATE_CURRENT', payload: [2, 3, 7, 11] }),
    ]));
  });
});
