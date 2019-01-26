/* eslint-disable no-loop-func */
import { combineReducers } from 'redux';
import { path } from 'lodash/fp';
import { handleAction } from 'redux-actions';

import { tilesPositionMapSelector } from './tiles';
import { resultListSelector } from './resultList';

import {
  VALID_STATE,
  checkCombinationInResultList,
  checkCombinationPossible,
} from './validations/sequenceValidation';

export const UPDATE_CURRENT_SEQUENCE = 'SEQUENCE/UPDATE_CURRENT';
export const RESET = 'SEQUENCE/RESET';

export const currentSequenceSelector = path('sequence.current');

export const updateSequence = currentSequence => ({
  type: UPDATE_CURRENT_SEQUENCE,
  payload: currentSequence || [],
});

export const resetSequence = () => ({ type: RESET });

export const validateWord = word => async (dispatch, getState) => {
  const state = getState();

  const positionMap = tilesPositionMapSelector(state);
  const resultList = resultListSelector(state);

  const resultValidation = checkCombinationInResultList(word, resultList);
  if (!resultValidation.valid) {
    return resultValidation;
  }

  const combinationValidation = checkCombinationPossible(word, positionMap);
  if (!combinationValidation.valid) {
    dispatch(resetSequence());
    return combinationValidation;
  }
  dispatch(updateSequence(combinationValidation.data));

  return VALID_STATE;
};

const takePayload = (state, { payload }) => payload;

const current = handleAction(
  UPDATE_CURRENT_SEQUENCE,
  takePayload,
  [],
);

const sequence = (state, action) => {
  if (action.type === RESET) {
    // eslint-disable-next-line
    state = undefined;
  }
  return combineReducers({
    current,
  })(state, action);
};

export default { sequence };
