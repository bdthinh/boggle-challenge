import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import tiles from './states/tiles';
import sequence from './states/sequence';
import resultList from './states/resultList';
import toast from './states/toast';

export const createReducer = () => combineReducers({
  machineId: (x = {}) => x,
  form: formReducer,
  ...tiles,
  ...sequence,
  ...resultList,
  ...toast,
});

export default createReducer;
