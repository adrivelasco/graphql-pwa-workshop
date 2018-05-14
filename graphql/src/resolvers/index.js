'use strict';

const Query = require('./Query');

// Every GraphQL service has a query type and may or may not have a mutation type. These types are the
// same as a regular object type, but they are special because they define the entry point of every GraphQL query.
// https://graphql.org/learn/schema/#the-query-and-mutation-types
const resolvers = {
  Query
};

module.exports = resolvers;
