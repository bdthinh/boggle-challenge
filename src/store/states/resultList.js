/* eslint-disable no-loop-func */
import { flow, path } from 'lodash/fp';
import { handleAction } from 'redux-actions';

import { notifySuccess, notifyError } from './toast';

import { isInDictionary } from '../mocks';

export const APPEND_WORD = 'RESULT/APPEND_WORD';

export const resultListSelector = path('resultList');
export const resultListLengthSelector = flow(resultListSelector, path('length'));

const appendWord = word => ({ type: APPEND_WORD, payload: word });

export const submitWord = word => (dispatch, getState) => {
  const state = getState();
  const resultList = resultListSelector(state);

  if (!resultList.includes(word) && isInDictionary(word)) {
    return dispatch([
      appendWord(word),
      notifySuccess('Correct!'),
    ]);
  }
  return dispatch(notifyError('Wrong!'));
};

const resultList = handleAction(
  APPEND_WORD,
  (state, { payload }) => ([...state, payload]),
  [],
);

export default { resultList };
