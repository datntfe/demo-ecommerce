import React from 'react';
import { EIconColor, EIconName } from 'components/Icon';

export type TDeliveryCardProps = {
  preview?: boolean;
  title?: string;
  description?: React.ReactNode;
  iconName?: EIconName;
  iconColor?: EIconColor;
  price?: string;
  showTooltip?: boolean;
};
