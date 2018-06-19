import React from 'react';
import PropTypes from 'prop-types';

import cs from 'classnames';
import styles from './TextField.css';

const TextField = ({
  onClick,
  onFocus,
  onBlur,
  onChange,
  placeholder,
  value,
  name,
  required,
  disabled,
  type,
  label,
  children,
  selector
}) => {
  if (type === 'checkbox' || type === 'radio') {
    return (
      <div
        className={styles.checkbox}
        onChange={(event) => onChange(event, { value: event.value })}
      >
        <input type={type} name={name} />
        <label htmlFor={name}>
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      {selector
        ? (
          <select
            disabled={disabled}
            required={required}
            name={name}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            defaultValue=""
            value={value}
            className={cs({
              [styles.field]: true,
              [styles.select]: true
            })}
          >
            <option disabled value="">
              {placeholder}
            </option>
            {Array.isArray(children)
              ? children.map((option, i) => (
                <option key={i} value={option.props.value}>
                  {option.props.children}
                </option>
              ))
              : children && (
                <option value={children.props.value}>
                  {children.props.children}
                </option>
              )
            }
          </select>
        )
        : (
          <input
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            spellCheck="false"
            autoCorrect="off"
            required={required}
            name={name}
            value={value}
            className={styles.field}
            type={type}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
          />
        )
      }
    </div>
  );
};

TextField.propTypes = {
  selector: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.string,
  maxHeight: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  floatingLabel: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  bordered: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

TextField.defaultProps = {
  onClick: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChange: () => null,
  required: false,
  maxLength: '100',
  type: 'text',
  disabled: false
};

export default TextField;
