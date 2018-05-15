import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MuiToolbar from 'material-ui/Toolbar';
import MuiTypography from 'material-ui/Typography';
import MuiAppBar from 'material-ui/AppBar';

import styles from './AppBar.styles';

const AppBar = ({ classes, title }) => {
  return (
    <React.Fragment>
      <MuiAppBar classes={{ root: classes.root }}>
        <MuiToolbar>
          <MuiTypography variant="title" color="inherit">
            {title}
          </MuiTypography>
        </MuiToolbar>
      </MuiAppBar>
      <div className={classes.fakeAppBar} />
    </React.Fragment>
  );
};

AppBar.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBar);
