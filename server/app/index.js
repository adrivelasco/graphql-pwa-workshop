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

// Initializing Express App
const app = express();

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

if (config.env === 'development') {
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

// Fallback
app.use(history());

// Routing
app.use(routes);

module.exports = app;
