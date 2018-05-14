'use strict';

const server = require('./server');
const config = require('./config');

// Node.js listening middleware
server
  .start({ port: config.port })

  .then(() => console.log(`GraphQL API Server is running on PORT ${config.port} (${config.env})`))

  .catch((err) => {
    console.error('Server start failed', err);
    process.exit(1);
  });
