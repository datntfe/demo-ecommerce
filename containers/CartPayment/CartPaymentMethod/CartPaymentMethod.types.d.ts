import React from 'react';

export type TCartPaymentMethodProps = TCartPaymentMethodData & {
  noShowLabel?: boolean;
  onClick?: () => void;
};

export type TCartPaymentMethodData = {
  key: string;
  title: string;
  description: string;
  checked?: boolean;
  suffix?: TCartPaymentMethodSuffix;
  expand?: ({ onClose }: TCartPaymentParams) => React.ReactNode;
};

export type TCartPaymentParams = { onClose?: () => void };

export type TCartPaymentMethodSuffix = {
  value?: string;
  image?: string;
  title?: string;
};
