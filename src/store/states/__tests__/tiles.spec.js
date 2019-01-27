import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import arrayMiddleware from '../../middlewares/arrayMiddleware';

import {
  tilesInputSelector,
  tilesPositionMapSelector,
  buildPositionMap,
  setupTilesBoard,
} from '../tiles';
import {
  EXAMPLE_TILES,
  EXAMPLE_POSITION_MAP,
} from './mockData';

describe('tiles state', () => {
  const state = {
    tiles: {
      input: EXAMPLE_TILES,
      positionMap: {
        T: [0],
        A: [1],
      },
    },
  };

  it('should return correct tiles input', () => {
    expect(tilesInputSelector(state)).toEqual(EXAMPLE_TILES);
  });

  it('should return correct tiles positionMap', () => {
    expect(tilesPositionMapSelector(state)).toEqual({
      T: [0],
      A: [1],
    });
  });

  it('should build correct positionMap', () => {
    expect(buildPositionMap(EXAMPLE_TILES)).toEqual(EXAMPLE_POSITION_MAP);
  });

  it('should dispatch enough actions', async () => {
    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore({});
    await store.dispatch(setupTilesBoard());

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'TILES/SET_TILES_INPUT' }),
      expect.objectContaining({ type: 'TILES/UPDATE_POSITION_MAP' }),
    ]));
  });
});
