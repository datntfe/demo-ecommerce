import React from 'react';
import classNames from 'classnames';
import { Input } from 'antd';

import { TTextAreaProps } from './TextArea.types';

const { TextArea: AntdTextArea } = Input;

const TextArea: React.FC<TTextAreaProps> = ({
  className,
  size,
  placeholder,
  onChange,
  value,
  showCount,
  maxLength,
}) => (
  <div className={classNames('TextArea', className)}>
    <AntdTextArea
      size={size}
      placeholder={placeholder}
      value={value}
      showCount={showCount}
      maxLength={maxLength}
      onChange={onChange}
    />
  </div>
);

export default TextArea;
