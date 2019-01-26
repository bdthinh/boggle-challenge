import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import arrayMiddleware from '../../middlewares/arrayMiddleware';

import {
  tilesInputSelector,
  tilesPositionMapSelector,
  buildPositionMap,
  setupTilesBoard,
} from '../tiles';

const EXAMPLE_TILES = ['T', 'A', 'P', '*', 'E', 'A', 'K', 'S', 'O', 'B', 'R', 'S', 'S', '*', 'X', 'D'];

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
    expect(buildPositionMap(EXAMPLE_TILES)).toEqual({
      T: [0, 3, 13],
      A: [1, 3, 5, 13],
      P: [2, 3, 13],
      B: [3, 9, 13],
      C: [3, 13],
      D: [3, 13, 15],
      E: [3, 4, 13],
      F: [3, 13],
      G: [3, 13],
      H: [3, 13],
      I: [3, 13],
      J: [3, 13],
      K: [3, 6, 13],
      L: [3, 13],
      M: [3, 13],
      N: [3, 13],
      O: [3, 8, 13],
      Q: [3, 13],
      R: [3, 10, 13],
      S: [3, 7, 11, 12, 13],
      U: [3, 13],
      V: [3, 13],
      W: [3, 13],
      X: [3, 13, 14],
      Y: [3, 13],
      Z: [3, 13],
    });
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
