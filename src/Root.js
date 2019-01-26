import React from 'react';
import { Provider } from 'react-redux';

import './styles/index.scss';

import Board from './components/Board';
import ResultList from './components/ResultList';
import Form from './components/Form';
import Timer from './components/Timer';
import Toast from './components/Toast';

import './styles/vendor/sweetalert.min.css';

import '../node_modules/rxjs/add/operator/map';
import '../node_modules/rxjs/add/operator/delay';
import '../node_modules/rxjs/add/operator/debounceTime';

const Root = ({ store }) => (
  <Provider store={store}>
    <div className="container">
      <Board />
      <div>
        <ResultList />
        <Form />
      </div>
      <Timer />
      <Toast />
    </div>
  </Provider>
);

export default Root;
