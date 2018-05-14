import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { SchemaLink } from 'apollo-link-schema';

import createCache from '../../client/core/createCache';

export default function createApolloClient(schema) {
  // "apollo-link" is a standard interface for modifying control flow of GraphQL requests and fetching GraphQL results,
  // designed to provide a simple GraphQL client that is capable of extensions.
  // https://github.com/apollographql/apollo-link
  const link = from([
    // Handle and inspect errors in your GraphQL network stack.
    // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-error
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (networkError) {
        console.warn(`[Network error]: ${networkError}`);
      }
    }),

    // Assists with mocking and server-side rendering
    // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-schema
    new SchemaLink({ ...schema })
  ]);

  // Creating an Apollo Client instance on the server
  // https://www.apollographql.com/docs/react/features/server-side-rendering.html
  return new ApolloClient({
    link,
    cache: createCache(),
    ssrMode: true,
    queryDeduplication: true
  });
}
