import gql from 'graphql-tag';

export const topStoriesQuery = gql`
  {
    topStories(limit: 5) {
      id,
      title,
      by {
        id
      },
      timeISO
    }
  }
`;
