import { trim } from 'lodash/fp';

import data from '../../static/TestBoard.txt';

export const getTiles = () => {
  if (data) {
    return Promise.resolve(data.split(',').map(trim));
  }
  return Promise.reject(new Error('Cannot read board'));
};
