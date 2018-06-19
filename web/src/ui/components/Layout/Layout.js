import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';
import Card from '../Card';
import Container from '../Container';
import styles from './Layout.css';

/**
 * Basic Style Layout structure of our website
 */
class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  };

  render() {
    const { children, location } = this.props;
    if (location.pathname !== '/login' && location.pathname !== '/create-account') {
      return (
        <div className={styles.appRoot}>
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
    return (
      <div className={styles.loginRoot}>
        <Card className={styles.card}>
          <div className={styles.title}>
            <span>Prode</span>
            <span>Copa del mundo 2018</span>
          </div>
          {children}
        </Card>
      </div>
    );
  }
}

export default Layout;
