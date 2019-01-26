import { combineReducers } from 'redux';
import { flow, over, path, reduce } from 'lodash/fp';
import { handleAction } from 'redux-actions';

import { getTiles } from '../mocks';

export const SET_TILES_INPUT = 'TILES/SET_TILES_INPUT';
export const UPDATE_POSITION_MAP = 'TILES/UPDATE_POSITION_MAP';
export const UPDATE_SEQUENCE = 'TILES/UPDATE_SEQUENCE';
export const RESET = 'TILES/RESET';


export const tilesInputSelector = path('tiles.input');
export const tilesPositionMapSelector = path('tiles.positionMap');
export const tilesCurrentSequenceSelector = path('tiles.currentSequence');

const ALPHABETS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

export const setInput = tiles => ({ type: SET_TILES_INPUT, payload: tiles });

export const updatePositionMap = positionMap => ({ type: UPDATE_POSITION_MAP, payload: positionMap });

const reduceWithIndex = reduce.convert({ cap: false });

const buildPositionMap = reduceWithIndex((book, value, index) => {
  if (value !== '*') {
    // eslint-disable-next-line
    book[value] = book[value] || [];
    book[value].push(index);
  } else {
    ALPHABETS.forEach(alphabet => {
      // eslint-disable-next-line
      book[alphabet] = book[alphabet] || [];
      book[alphabet].push(index);
    });
  }
  return book;
}, {});


export const setupTilesBoard = () => dispatch => (
  getTiles()
    .then(flow(
      over([setInput, buildPositionMap]),
      dispatch
    ))
);

const takePayload = (state, { payload }) => payload;

const input = handleAction(
  SET_TILES_INPUT,
  takePayload,
  [],
);

const positionMap = handleAction(
  SET_TILES_INPUT,
  takePayload,
  {},
);

const tiles = (state, action) => {
  if (action.type === RESET) {
    // eslint-disable-next-line
    state = undefined;
  }
  return combineReducers({
    input,
    positionMap,
  })(state, action);
};

export default { tiles };
