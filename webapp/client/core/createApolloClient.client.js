import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

import createCache from './createCache';

export default function createApolloClient() {
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

    // HTTP Link takes an object with some options on it to customize the behavior of the link.
    // If your server supports it, the HTTP link can also send over metadata about the request in the extensions field.
    // https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http
    new HttpLink({
      uri: '/graphql',
      credentials: 'include'
    })
  ]);

  const cache = createCache();

  return new ApolloClient({
    link,
    cache: cache.restore(window.APOLLO_STATE),
    queryDeduplication: true,
    connectToDevTools: true
  });
}
