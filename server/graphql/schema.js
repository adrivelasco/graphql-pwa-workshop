'use strict';

const { HackerNews } = require('graphqlhub-schemas');
const { GraphQLSchema } = require('graphql');

const schema = new GraphQLSchema({
  query: HackerNews.QueryObjectType
});

module.exports = schema;
