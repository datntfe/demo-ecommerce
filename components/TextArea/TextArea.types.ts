import React, { ChangeEvent } from 'react';

import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TTextAreaProps = {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: SizeType;
  showCount?: boolean;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
