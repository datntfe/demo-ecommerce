import React from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { TButtonProps } from 'components/Button';

export type TProductHorizontalProps = {
  className?: string;
  size?: SizeType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  subtitle?: React.ReactNode;
  price?: React.ReactNode;
  buttonProps?: TButtonProps;
};
