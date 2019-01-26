import { combineReducers } from 'redux';

export const createReducer = () => combineReducers({
  machineId: (x = {}) => x,
});

export default createReducer;
