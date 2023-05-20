import React from 'react';

export type TCheckboxProps = {
  className?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  value?: boolean;
  onChange?: (checked: boolean) => void;
};
