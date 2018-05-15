import gql from 'graphql-tag';

export const hello = gql(`
  {
    animals {
      id,
      name
    }
  }
`);
