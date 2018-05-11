'use strict';

const path = require('path');
const express = require('express');
const renderHtml = require('./renderHtml');
const history = require('connect-history-api-fallback');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');

const config = require('../config');
const schema = require('../graphql/schema');

const router = express.Router();
const isProduction = config.env === 'production';

// Apollo Server is a library that helps you connect a GraphQL schema to an HTTP server in Node.
// https://github.com/apollographql/apollo-server
router.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// A graphical interactive in-browser GraphQL IDE. (Only available for development)
// https://github.com/graphql/graphiql
if (!isProduction) {
  router.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

// Middleware to proxy requests through a specified index page, useful for SPA that utilise the HTML5 History API.
// https://github.com/bripkens/connect-history-api-fallback
router.use(history());

// Create a virtual path prefix (where the path does not actually exist in the file system) for files that
// are served by the express.static function, specify a mount path for the static directory, as shown below:
// http://expressjs.com/en/starter/static-files.html
router.use('/static', express.static(path.resolve(__dirname, '../../build/static')));

router.get('*', renderHtml);

module.exports = router;
