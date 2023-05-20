import classNames from 'classnames';
import { Input as AntdInput } from 'antd';
import React from 'react';

const InputComponent = ({
  className,
  type,
  size,
  placeholder,
  prefix,
  suffix,
  onChange,
  onEnter,
  value,
}: any) => {
  const handleKeydown = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onEnter?.();
    }
  };
  return (
    <div
      className={classNames('Input-component', className, {
        affix: suffix || prefix,
      })}
    >
      <AntdInput
        type={type}
        size={size}
        placeholder={placeholder}
        value={value}
        prefix={prefix}
        suffix={suffix}
        onChange={onChange}
        onKeyDown={handleKeydown}
      />
    </div>
  );
};
export default InputComponent;
