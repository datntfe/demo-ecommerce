import React from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { EButtonStyleType } from './Button.enums';

export type TButtonProps = {
  className?: string;
  title?: React.ReactNode;
  size?: SizeType;
  primary?: boolean;
  icon?: React.ReactNode;
  radius?: boolean;
  reverse?: boolean;
  disabled?: boolean;
  styleType?: EButtonStyleType;
  htmlType?: 'button' | 'submit';
  onClick?: () => void;
};
