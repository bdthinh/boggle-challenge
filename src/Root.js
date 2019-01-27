import React from 'react';
import { Provider } from 'react-redux';

import './styles/index.scss';

import Board from './components/Board';
import ResultList from './components/ResultList';
import Form from './components/Form';
import Toast from './components/Toast';
import Timer from './components/Timer';

import './styles/vendor/sweetalert.min.css';

import '../node_modules/rxjs/add/operator/map';
import '../node_modules/rxjs/add/operator/delay';
import '../node_modules/rxjs/add/operator/debounceTime';

const Root = ({ store }) => (
  <Provider store={store}>
    <div className="container">
      <div className="left">
        <Timer />
        <Board />
      </div>
      <div className="right">
        <ResultList />
        <Form />
      </div>
      <Toast />
    </div>
  </Provider>
);

export default Root;
