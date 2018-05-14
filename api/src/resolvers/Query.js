'use strict';

const Query = {
  hello: (source, args, ctx) => {
    return `Hello ${args.name || 'world'}!`;
  }
};

module.exports = Query;
