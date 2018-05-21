import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Typography from 'material-ui/Typography';

import { personById } from '../../queries/animals';
import styles from './Detail.css';

class Detail extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      animals: PropTypes.arrayOf(PropTypes.shape({
        age: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string,
        thumbnail: PropTypes.string
      }))
    })
  };

  render() {
    const { data } = this.props;

    if (data.loading) {
      return <Typography>Loading...</Typography>;
    }
    if (data.error) {
      return <Typography>Error {data.error.message}</Typography>;
    }
    if (data.animal) {
      const person = data.animal;
      return (
        <div className={styles.root}>
          <div className={styles.image}>
            <img src={person.thumbnail} alt={person.name} />
          </div>
          <div className={styles.info}>
            <Typography variant="title">{person.name}</Typography>
            <br />
            <Typography component="p">
              Age: <strong>{person.age}</strong>
            </Typography>
            <Typography component="p">
              Weight: <strong>{person.weight}</strong>
            </Typography>
            <Typography component="p">
              Height: <strong>{person.height}</strong>
            </Typography>
            <Typography component="p">
              Hair color: <strong>{person.age}</strong>
            </Typography>
            <Typography component="p">
              Age: <strong>{person.age}</strong>
            </Typography>
          </div>
        </div>
      );
    }
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const DetailWithData = compose(
  graphql(personById, {
    options: (props) => ({
      variables: {
        name: props.match.params.name
      }
    })
  })
)(Detail);

export default DetailWithData;
