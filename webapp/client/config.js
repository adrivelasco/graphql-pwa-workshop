// Client Configuration
const config = {
  app: {
    title: 'GraphxList',
    description: 'Universal React App'
  },
  // GraphQL API Gateway
  apiGateway: {
    // API URL to be used in the server-side code
    url: process.env.GRAPHQL_URL || 'http://localhost:4000'
  }
};

export default config;
