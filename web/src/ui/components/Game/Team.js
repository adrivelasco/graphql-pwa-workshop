import React from 'react';
import PropTypes from 'prop-types';

import styles from './Team.css';

const Team = ({ children, name, point, editable, flag, onPointChange }) => {
  const fieldComponent = () => (
    <input
      maxLength={2}
      name={`team:${name}-input`}
      className={styles.field}
      type="text"
      onChange={({ target }) => onPointChange(target.name, target.value)}
    />
  );
  const pointComponent = () => (
    <div className={styles.point}>{point}</div>
  );
  return (
    <div className={styles.root}>
      <div className={styles.team}>
        <div className={styles.flag}>
          {flag && (
            <img src={flag} alt={name} />
          )}
        </div>
        <span className={styles.name}>{name}</span>
      </div>
      {editable ? fieldComponent() : pointComponent()}
    </div>
  );
};

Team.propTypes = {
  flag: PropTypes.string,
  name: PropTypes.string,
  point: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editable: PropTypes.bool
};

Team.defaultProps = {
  onPointChange: () => null,
  flag: '',
  name: '',
  point: '-',
  editable: true
};

export default Team;
