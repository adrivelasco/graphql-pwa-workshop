import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';

import styles from './Button.css';

const Button = ({
  children,
  className,
  type,
  onClick,
  href,
  link,
  disabled,
  block,
  active,
  size
}) => {
  const classes = cs({
    [styles.root]: true,
    [styles.active]: active,
    [styles.block]: block,
    [styles.disabled]: disabled,
    [styles.sm]: size === 'sm',
    [className]: className
  });
  const renderLabel = ({ children }) => (
    <span className={styles.label}>
      {children}
    </span>
  );
  if (link) {
    return (
      <Link className={classes} to={href}>
        {renderLabel({ children })}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      type={type}
      className={classes}
    >
      {renderLabel({ children })}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['sm', 'md']),
  className: PropTypes.string,
  block: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  size: 'md',
  active: false,
  disabled: false,
  type: 'button',
  href: '#',
  onClick: () => null,
  link: false
};

export default Button;
