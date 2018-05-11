'use strict';

require('./css-compiler');

const React = require('react');
const createElement = React.createElement;
const ReactDOM = require('react-dom/server');
const { StaticRouter } = require('react-router');
const { ApolloProvider } = require('react-apollo');
const { JssProvider } = require('react-jss');
const { MuiThemeProvider } = require('material-ui/styles');

const MuiTheme = require('./mui-theme');
const App = require('../../../client/components/App').default;
const Html = require('../../../client/components/Html').default;
const clientConfig = require('../../../client/config').default;
const assets = require('../../../build/assets.json');

// GraphQL Setup
const createApolloClient = require('../../core/createApolloClient.server').default;
const schema = require('../../graphql/schema');

/**
 * SSR Middleware for render html to client
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function renderHtml(req, res, next) {
  try {
    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req }
    });

    const context = {
      // Apollo Client for use with react-apollo
      client: apolloClient
    };

    let status = 200;
    if (context.url) {
      status = 302;
      req.originalUrl = context.url;
    }
    if (context.status === '404') {
      status = 404;
    }

    // Create a fresh, new sheetsRegistry and theme instance on every request.
    const { sheetsRegistry, generateClassName, theme, grabCss } = new MuiTheme();

    const RootApp = ReactDOM.renderToString(
      createElement(ApolloProvider, { client: apolloClient },
        createElement(StaticRouter, { location: req.originalUrl, context },
          createElement(JssProvider, { registry: sheetsRegistry, generateClassName },
            createElement(MuiThemeProvider, { theme, sheetsManager: new Map() },
              createElement(App)))))
    );

    // Pull the CSS out of the sheetsRegistry.
    const jss = grabCss();

    const html = `<!doctype html>${ReactDOM.renderToStaticMarkup(
      createElement(Html, {
        title: clientConfig.app.title,
        description: clientConfig.app.description,
        favicon: '',
        styles: [assets.client.css],
        scripts: [assets.vendor.js, assets.client.js],
        apolloState: context.client.extract(),
        jss: jss,
        children: RootApp
      })
    )}`;

    // Send the rendered page back to the client.
    res.status(status);
    res.send(html);
  } catch (err) {
    next(err);
  }
};

module.exports = renderHtml;
