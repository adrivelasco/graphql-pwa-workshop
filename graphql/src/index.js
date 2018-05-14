'use strict';

// Node.js listening middleware
const server = require('./server');
const config = require('./config');

server
  .start({ port: config.port })

  .then(() => console.log(`GraphQL API Server is running on PORT ${config.port} (${config.env})`))

  .catch((err) => {
    console.error('Server start failed', err);
    process.exit(1);
  });
