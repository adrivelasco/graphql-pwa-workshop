'use strict';

const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./resolvers');

// Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
// https://github.com/graphcool/graphql-yoga
const server = new GraphQLServer({
  typeDef: path.resolve(__dirname, './schema.graphql'),
  resolvers,
  context: req => ({ ...req })
});

module.exports = server;
