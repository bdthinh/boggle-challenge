/* eslint-disable no-loop-func */
import { path } from 'lodash/fp';
import { handleAction } from 'redux-actions';

export const APPEND_WORD = 'RESULT/APPEND_WORD';

export const resultListSelector = path('resultList');

export const appendWord = word => (dispatch, getState) => {
  const state = getState();
  const resultList = resultListSelector(state);

  if (resultList.includes(word)) {
    return Promise.reject(new Error('Word is already in list'));
  }
  return dispatch({ type: APPEND_WORD, payload: word });
};

const resultList = handleAction(
  APPEND_WORD,
  (state, { payload }) => ([...state, payload]),
  [],
);

export default { resultList };
