import React from 'react';

export type TDrawerProps = {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
  placement?: 'top' | 'left' | 'right' | 'bottom';
  children?: React.ReactNode;
};
