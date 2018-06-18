import React from 'react';
import PropTypes from 'prop-types';

import Container from '../Container';
import Menu from './Menu';
import Item from './Item';
import styles from './Navbar.css';

const Navbar = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.navbar}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              {title}
            </div>
            <div className={styles.menu}>
              {children}
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.fakeHeader}></div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string
};

Navbar.Item = Item;

Navbar.Menu = Menu;

export default Navbar;
