import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';

import App from './components/App';
import createApolloClient from './core/createApolloClient.client';
import history from './history';

// Generate a theme base on the options received.
// https://material-ui-next.com/customization/themes/#createmuitheme-options-theme
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light'
  }
});

// React Mount Tag
const mountNode = document.getElementById('app');

// Apollo Client
const apolloClient = createApolloClient();

// Same as render(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer.
// React will attempt to attach event listeners to the existing markup.
// https://reactjs.org/docs/react-dom.html#hydrate
ReactDOM.hydrate(
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
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
