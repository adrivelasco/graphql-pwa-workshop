import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.css';

const Container = ({ children }) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node
};

export default Container;
