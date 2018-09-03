import React from 'react';
import ReactDOM from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../redux/store';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from '../routes.js';
import { syncHistoryWithStore } from 'react-router-redux';

let initialState = {};

const store = configureStore(initialState, browserHistory);
let persistor = persistStore(store);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history} routes={routes} />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
