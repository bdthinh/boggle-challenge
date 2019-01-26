import React from 'react';
import { Provider } from 'react-redux';

import Board from './components/Board';
import Form from './components/Form';

const Root = ({ store }) => (
  <Provider store={store}>
    <div className="container">
      <Board />
      <div>
        <Form />
      </div>
    </div>
  </Provider>
);

export default Root;
