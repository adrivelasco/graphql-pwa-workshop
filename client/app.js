// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// MUI
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';

// Import root app
import App from './components/App';

// Apollo
import { ApolloProvider } from 'react-apollo';
import createApolloClient from './core/createApolloClient.client';

import configureStore from './store/configureStore';
import history from './history';

const initialState = window.APP_STATE;
const store = configureStore(initialState, history);
const mountNode = document.getElementById('app');

// ApolloClient

const apolloClient = createApolloClient();

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light'
  }
});

// Rendering client side
ReactDOM.hydrate(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  mountNode
);

// Easy-to-use library for eliminating the 300ms delay between a
// physical tap and the firing of a click event on mobile browsers
FastClick.attach(document.body);

// Remove the server-side inject CSS
const jssStyles = document.getElementById('jss-server-side');
if (jssStyles && jssStyles.parentNode) {
  jssStyles.parentNode.removeChild(jssStyles);
}
