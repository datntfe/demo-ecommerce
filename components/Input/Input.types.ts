import React from 'react';

import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TInputProps = {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  numberic?: boolean;
  readOnly?: boolean;
  size?: SizeType;
  noAffixBorder?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onSearch?: (value: string) => void;
  onClick?: () => void;
};
