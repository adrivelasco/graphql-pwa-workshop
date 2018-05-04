import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class Home extends React.Component {
  render() {
    const GET_TOP_STORIES = gql`
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

    return (
      <div>
        <Typography variant="title">
          Last 5 Top Stories
        </Typography>
        <br />
        <br />
        <Query query={GET_TOP_STORIES}>
          {({ loading, error, data }) => {
            if (loading) {
              return 'Loading...';
            }
            if (error) {
              return `Error! ${error.message}`;
            }
            return (
              <div>
                {data.topStories.map((story, i) => {
                  return (
                    <Card key={story.id}>
                      <CardContent>
                        <Typography variant="subheading" component="h2">
                          {story.title}
                        </Typography>
                        <Typography color="textSecondary">
                          @{story.by.id}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Home;
