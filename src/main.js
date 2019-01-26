import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createStore from './store/createStore';
import Root from './Root';

const { store } = createStore();

injectTapEventPlugin();

// eslint-disable-next-line
const rootNode = document.getElementById("root");

ReactDOM.render(<Root store={store} />, rootNode);

// eslint-disable-next-line
if (module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line
    const NextRoot = require('./Root').default;
    ReactDOM.render(<NextRoot store={store} />, rootNode);
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.js');
}
