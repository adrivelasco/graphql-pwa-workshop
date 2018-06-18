import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import styles from './Title.css';

const Title = ({ children, uppercase }) => {
  return (
    <span
      className={cs({
        [styles.root]: true,
        [styles.uppercase]: uppercase
      })}
    >
      {children}
    </span>
  );
};

Title.propTypes = {
  uppercase: PropTypes.bool
};

export default Title;
