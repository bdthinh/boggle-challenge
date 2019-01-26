import React from 'react';
import { Provider } from 'react-redux';

import Board from './components/Board';
import ResultList from './components/ResultList';
import Form from './components/Form';

const Root = ({ store }) => (
  <Provider store={store}>
    <div className="container">
      <Board />
      <div>
        <ResultList />
        <Form />
      </div>
    </div>
  </Provider>
);

export default Root;
