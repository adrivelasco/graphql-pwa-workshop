import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from 'material-ui/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { animals } from '../../../queries/animals';
import styles from './Home.css';

class Home extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      topStories: PropTypes.array
    })
  };

  render() {
    const { data, history } = this.props;
    return (
      <div>
        <div className={styles.title}>
          <Typography variant="title">GraphQL PWA Workshop</Typography>
          <Typography variant="subheading">@adrivelasco</Typography>
          <br />
          <Typography component="p">
            {`This proyect is for a workshop of how to create an Universal Application with Nodejs + Reactjs and 
            connect our UI to a GraphQL API Server running in parallel with Apollo. Using modern tools such as Webpack, 
            Babel and PostCSS.`}
          </Typography>
        </div>
        <div>
          {data.loading && <Typography>Loading...</Typography>}

          {data.error && <Typography>Error {data.error.message}</Typography>}

          {data.animals && (
            <div className={styles.list}>
              <Grid container spacing={8}>
                {data.animals.length > 0 && data.animals.map((animal, i) => {
                  return (
                    <Grid item xs={6} sm={3} key={animal.id}>
                      <Card
                        className={styles.card}
                        onClick={() => history.push(`/${animal.name}`)}
                      >
                        <CardMedia
                          className={styles.media}
                          image={animal.thumbnail}
                          title={animal.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="title" component="h2">
                            {animal.name}
                          </Typography>
                          <Typography component="p">
                            ID: {animal.id}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const HomeWithData = compose(
  graphql(animals)
)(Home);

export default HomeWithData;
