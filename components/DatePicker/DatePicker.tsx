import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import classNames from 'classnames';

import { EFormat } from 'common/enums';

import Icon, { EIconColor, EIconName } from 'components/Icon';
import { TDatePickerProps } from './DatePicker.types';

const DatePicker: React.FC<TDatePickerProps> = ({
  className,
  value,
  placeholder,
  disabled,
  size,
  disabledDate,
  onChange,
}) => (
  <div className={classNames('DatePicker', className)}>
    <AntdDatePicker
      format={EFormat.DATE}
      value={value}
      size={size}
      placeholder={placeholder}
      disabled={disabled}
      suffixIcon={
        <Icon name={EIconName.Calendar} color={EIconColor.EBONY_CLAY} />
      }
      onChange={onChange}
      disabledDate={disabledDate}
    />
  </div>
);

export default DatePicker;
