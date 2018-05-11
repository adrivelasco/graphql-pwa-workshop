'use strict';

// Server Configuration
const config = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3002,

  apiBasePath: '/',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`
  }
};

module.exports = config;
