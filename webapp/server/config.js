'use strict';

// Server Configuration
const config = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3002,

  apiBasePath: '/',

  // GraphQL API Gateway
  apiGateway: {
    url: process.env.GRAPHQL_URL || 'http://localhost:4000'
  }
};

module.exports = config;
