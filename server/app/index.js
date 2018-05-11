'use strict';

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const sanitized = require('express-sanitized');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes');
const config = require('../config');

// Initializing Express App
const app = express();
const isProduction = config.env === 'production';

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// HTTP request logger middleware for node.js
// https://github.com/expressjs/morgan
if (!isProduction) {
  app.use(morgan('dev'));
  app.enable('trust proxy');
}

// Returns true if the Boolean setting name is disabled (false), where name is one of the
// properties from the app settings table.
// http://expressjs.com/es/4x/api.html#app.disabled
app.disable('x-powered-by');

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
// Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
// https://github.com/expressjs/cookie-parser
app.use(cookieParser());

// Sanitize is a whitelist - based HTML and CSS sanitizer.
// https://github.com/rgrove/sanitize
app.use(sanitized());

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Node.js compression middleware. The following compression codings are supported: deflate, gzip.
// https://github.com/expressjs/compression
app.use(compression());

// Express application routes
app.use(routes);

module.exports = app;
