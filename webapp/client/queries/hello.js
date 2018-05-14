import gql from 'graphql-tag';

export const hello = gql`
  {
    hello(name: "Adrián")
  }
`;
