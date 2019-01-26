import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import tiles from './states/tiles';
import sequence from './states/sequence';
import resultList from './states/resultList';

export const createReducer = () => combineReducers({
  machineId: (x = {}) => x,
  form: formReducer,
  ...tiles,
  ...sequence,
  ...resultList,
});

export default createReducer;
