import gql from 'graphql-tag';

export const GetPersonFields = `
  id,
  name,
  age,
  thumbnail
`;

export const animals = gql(`
  {
    animals {
      ${GetPersonFields}
    }
  }
`);

export const personById = gql(`
  query animal($name: String!) {
    animal(name: $name) {
      ${GetPersonFields}
      weight
      height
      hair_color
      professions
      friends
    }
  }
`);
