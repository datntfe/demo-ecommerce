import React from 'react';
import classNames from 'classnames';
import { Radio as AntdRadio, RadioChangeEvent, Space } from 'antd';

import { TRadioProps } from './Radio.types';

const Radio: React.FC<TRadioProps> = ({
  className,
  options = [],
  value,
  direction,
  onChange,
}) => {
  const handleRadioChange = (e: RadioChangeEvent): void => {
    const { value: currentValue } = e.target;
    const option = options.find((item) => item.value === currentValue);
    if (option) onChange?.(option);
  };

  return (
    <div className={classNames('Radio', className)}>
      <AntdRadio.Group
        onChange={handleRadioChange}
        value={options.find((item) => item.value === value?.value)?.value}
      >
        <Space direction={direction || 'vertical'}>
          {options.map((item) => (
            <AntdRadio key={item.value} value={item.value}>
              {item.label}
            </AntdRadio>
          ))}
        </Space>
      </AntdRadio.Group>
    </div>
  );
};

export default Radio;
