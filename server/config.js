'use strict';

const config = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3002,

  apiBasePath: '/',

  cache: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    defaultTimeSeconds: 1800
  }
};

module.exports = config;
