import { trim } from 'lodash/fp';

import boardData from '../../static/TestBoard.txt';
import dictionaryData from '../../static/dictionary.txt';

export const getTiles = () => {
  if (boardData) {
    return Promise.resolve(boardData.split(',').map(trim));
  }
  return Promise.reject(new Error('Cannot read board'));
};

const createDictionary = () => {
  const dictionary = dictionaryData.split('\n');
  return new Set(dictionary);
};

export const dictionary = createDictionary();
