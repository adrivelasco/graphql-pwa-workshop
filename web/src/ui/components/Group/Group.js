import React from 'react';
import PropTypes from 'prop-types';

import styles from './Group.css';

const Group = ({ children, title }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

Group.propTypes = {
  title: PropTypes.string
};

export default Group;
