import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Item.css';

const Item = ({ children, text, link }) => {
  return (
    <div className={styles.root}>
      <Link className={styles.a} to={link}>
        {text}
      </Link>
    </div>
  );
};

Item.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
};

Item.defaultProps = {
  text: '',
  link: '#'
};

export default Item;
