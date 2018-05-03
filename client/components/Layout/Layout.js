import React from 'react';
import { withStyles } from 'material-ui/styles';

import AppBar from '../AppBar';
import styles from './Layout.styles';

const Layout = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar title="AV Tweetx" />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

export default withStyles(styles)(Layout);
