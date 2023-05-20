import React from 'react';
import classNames from 'classnames';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { TCheckboxProps } from './Checkbox.types';

const Checkbox: React.FC<TCheckboxProps> = ({
  className,
  label,
  disabled,
  value,
  onChange,
}) => {
  const handleCheckboxChange = (e: CheckboxChangeEvent): void => {
    const { checked } = e.target;
    onChange?.(checked);
  };

  return (
    <div className={classNames('Checkbox', className)}>
      <AntdCheckbox
        checked={value}
        onChange={handleCheckboxChange}
        disabled={disabled}
      >
        {label}
      </AntdCheckbox>
    </div>
  );
};

export default Checkbox;
