import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';
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
        <Navbar
          title="Cuponstar"
        >
          <Navbar.Menu>
            <Navbar.Item text="Fechas" link="/" />
            <Navbar.Item text="Posiciones" link="/" />
            <Navbar.Item text="Mi cuenta" link="/" />
            <Navbar.Item text="Salir" link="/" />
          </Navbar.Menu>
        </Navbar>
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
