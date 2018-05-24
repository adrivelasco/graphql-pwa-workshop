'use strict';

// Server Configuration
const config = {
  env: process.env.NODE_ENV || 'development',

  port: process.env.PORT || '4010',

  apiBasePath: '/',

  // GraphQL API Gateway
  apiGateway: {
    url: process.env.GRAPHQL_URL || 'http://localhost:4000'
  }
};

module.exports = config;
