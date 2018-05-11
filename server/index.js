'use strict';

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
// https://github.com/motdotla/dotenv
require('dotenv').config();

// Babel compiler
require('./babel-runtime');

// Node.js listening middleware
const app = require('./app');
const config = require('./config');

app.listen(config.port, () =>
  console.log(`Nodejs server with GraphQL API is running on PORT ${config.port} (${config.env})`)
);
