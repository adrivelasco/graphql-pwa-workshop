'use strict';

// Loading enviroment variables
require('dotenv').config();

// Babel runtime
require('./babel-runtime');

// Node.js listening middleware
const app = require('./app');
const config = require('./config');

app.listen(config.port, () =>
  console.log(`Nodejs server is running on PORT ${config.port} (${config.env})`)
);
