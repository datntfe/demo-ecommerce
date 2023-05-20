import React from 'react';

import { TSelectOption } from 'components/Select';

export type TRadioOption = Omit<TSelectOption, 'label'> & {
  label: React.ReactNode;
};

export type TRadioProps = {
  className?: string;
  value?: TRadioOption;
  direction?: 'horizontal' | 'vertical';
  options?: TRadioOption[];
  onChange?: (data: TRadioOption) => void;
};
