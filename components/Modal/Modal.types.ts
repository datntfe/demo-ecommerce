import React from 'react';

export type TModalProps = {
  visible?: boolean;
  onClose?: () => void;
  width?: number;
  title?: string;
  className?: string;
  children?: React.ReactNode;
};
