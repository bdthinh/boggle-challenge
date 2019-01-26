import React from 'react';
import { Provider } from 'react-redux';

import Board from '../Board';

const Root = ({ store }) => (
  <Provider store={store}>
    <div className="container">
      <Board />
    </div>
  </Provider>
);

export default Root;
