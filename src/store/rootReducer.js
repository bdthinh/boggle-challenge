import { combineReducers } from 'redux';

import tiles from './states/tiles';

export const createReducer = () => combineReducers({
  machineId: (x = {}) => x,
  ...tiles,
});

export default createReducer;
