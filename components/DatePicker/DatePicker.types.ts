import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Moment } from 'moment';

export type TDatePickerProps = {
  className?: string;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  size?: SizeType;
  onChange?: (value: any) => void;
  disabledDate?: (current: Moment) => boolean;
};
