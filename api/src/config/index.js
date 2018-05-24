'use strict';

const config = {
  port: process.env.PORT || '4000',

  env: process.env.NODE_ENV || 'development',

  api: {
    url: 'http://www.mocky.io/v2/5aa722ea2f0000e8048ea463'
  }
};

module.exports = config;
