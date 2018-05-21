import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '../AppBar';
import Container from '../Container';
import styles from './Layout.css';

/**
 * Basic Style Layout structure of our website
 */
class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <AppBar title="GraphQL PWA Workshop" />
        <div className={styles.content}>
          <Container>
            {children}
          </Container>
        </div>
      </div>
    );
  }
}

export default Layout;
