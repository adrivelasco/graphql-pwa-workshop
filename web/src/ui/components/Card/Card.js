import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import Title from './Title';
import styles from './Card.css';

const Card = ({ className, children }) => {
  return (
    <div className={cs(styles.root, className)}>
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string
};

Card.defaultProps = {
  className: ''
};

Card.Title = Title;

export default Card;
