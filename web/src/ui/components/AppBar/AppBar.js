import React from 'react';
import PropTypes from 'prop-types';
import MuiToolbar from 'material-ui/Toolbar';
import MuiTypography from 'material-ui/Typography';
import MuiAppBar from 'material-ui/AppBar';

import styles from './AppBar.css';

const AppBar = ({ title }) => {
  return (
    <React.Fragment>
      <MuiAppBar className={styles.root}>
        <MuiToolbar className={styles.toolbar}>
          <MuiTypography variant="title" color="inherit">
            {title}
          </MuiTypography>
        </MuiToolbar>
      </MuiAppBar>
      <div className={styles.fakeAppBar} />
    </React.Fragment>
  );
};

AppBar.propTypes = {
  title: PropTypes.string
};

export default AppBar;
