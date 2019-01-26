import fs from 'fs';
import { trim } from 'lodash/fp';

export const getTiles = () => (
  fs.readFile('../../static/TestBoard.txt', 'utf8', (err, data) => {
    if (err) {
      return Promise.reject(new Error('Cannot read board'));
    }
    return Promise.resolve(data.split(',').map(trim));
  })
);
