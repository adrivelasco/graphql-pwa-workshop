import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import { topStoriesQuery } from '../../queries/topStoriesQuery';
import styles from './Home.styles';

class Home extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      topStories: PropTypes.array
    })
  };

  render() {
    const { data, classes } = this.props;
    return (
      <div>
        <div className={classes.title}>
          <Typography variant="title">Last 5 Top Stories</Typography>
          <Typography variant="subheading">from @HackerNews</Typography>
        </div>
        <div>
          {data.loading && <Typography>Loading...</Typography>}

          {data.error && <Typography>Error {data.error.message}</Typography>}

          {data.topStories && data.topStories.length > 0 && (
            <List classes={{ root: classes.list }}>
              {data.topStories.map((story, i) => (
                <ListItem key={story.id}>
                  <ListItemText
                    primary={story.title}
                    secondary={`@${story.by.id}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </div>
    );
  }
}

const HomeWithData = compose(
  graphql(topStoriesQuery),
  withStyles(styles)
)(Home);

export default HomeWithData;
