import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import styles from './Button.styles';

const Button = ({ children, classes }) => (
  <MuiButton
    variant="raised"
    color="primary"
    classes={{
      root: classes.root
    }}
  >
    {children}
  </MuiButton>
);

Button.propTypes = {
  className: PropTypes.string
};

export default withStyles(styles)(Button);
