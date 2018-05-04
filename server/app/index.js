'use strict';

const express = require('express');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const sanitized = require('express-sanitized');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('../config');

// GraphQL - Apollo
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('../graphql/schema');

// Initializing Express App
const app = express();

// Mode
const isDebug = config.env === 'development';

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

if (isDebug) {
  app.use(morgan('dev'));
  app.enable('trust proxy');
}

// Register Node.js middleware
app.disable('x-powered-by');
app.use(cookieParser());
app.use(sanitized());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if (isDebug) app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Fallback
app.use(history());

// Routing
app.use(routes);

module.exports = app;
