import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import { hello } from '../../queries/hello';
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

          {data.hello && (
            <List classes={{ root: classes.list }}>
              <ListItem>
                <ListItemText
                  primary={data.hello}
                  secondary="@$adrivelasco15"
                />
              </ListItem>
            </List>
          )}
        </div>
      </div>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const HomeWithData = compose(
  graphql(hello),
  withStyles(styles)
)(Home);

export default HomeWithData;
