import React from 'react';
import { over } from 'lodash/fp';

const CustomInputOnly = ({
  onPreValidate,
  onValidate,
  onHighlight,
  input: { onChange, onBlur, onFocus, ...otherInputProps },
  meta: { active },
  className,
  type,
  placeholder,
  required,
  errorStyles,
  ...others
}) => (
  <div>
    <div className={`${className} input-container ${active ? 'focus' : ''}`}>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        required={required}
        {...others}
        {...otherInputProps}
        onBlur={onBlur}
        onChange={e => {
          onChange(e);
          over(onValidate)(e);
        }}
      />
    </div>
  </div>
);

export default CustomInputOnly;
