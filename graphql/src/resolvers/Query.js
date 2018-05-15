'use strict';

const rp = require('request-promise');

const config = require('../config');

const Query = {
  animals: async (source, args, ctx) => {
    try {
      const response = await rp({
        method: 'GET',
        uri: config.api.url,
        json: true,
        resolveWithFullResponse: true
      });
      return response.body;
    } catch (err) {
      return console.log(err);
    }
  },

  animal: async (source, args, ctx) => {
    try {
      const response = await rp({
        method: 'GET',
        uri: config.api.url,
        json: true,
        resolveWithFullResponse: true
      });
      return response.body.find(({ name }) => name === args.name);
    } catch (err) {
      return console.log(err);
    }
  }
};

module.exports = Query;
