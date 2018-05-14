import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import styles from './Container.styles';

const Container = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
