import React from 'react';
import { withStyles } from 'material-ui/styles';

import AppBar from '../AppBar';
import Container from '../Container';
import styles from './Layout.styles';

class Layout extends React.PureComponent {
  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar title="GraphxList" />
        <div className={classes.content}>
          <Container>
            {children}
          </Container>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
