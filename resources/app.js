import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configure from './store';

// Root store
var store = configure();

// route components
import Routes from './routes';

// Main router
ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('root')
);
