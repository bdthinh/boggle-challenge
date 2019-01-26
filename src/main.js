import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createStore from './store/createStore';
import Root from './components/Root';
import history from './history';

const { store } = createStore();

injectTapEventPlugin();

// eslint-disable-next-line
const rootNode = document.getElementById("root");

ReactDOM.render(<Root store={store} history={history} />, rootNode);

// eslint-disable-next-line
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line
    const NextRoot = require('./components/Root').default;
    ReactDOM.render(<NextRoot store={store} history={history} />, rootNode);
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.js');
}
