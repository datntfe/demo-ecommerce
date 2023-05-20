import React from 'react';

export type TCountdownTimeProps = {
  className?: string;
  defaultValue?: string;
  format?: string;
  onFinish?: () => void;
  render?: (value: {
    hours?: string | number;
    minutes?: string | number;
    seconds?: string | number;
  }) => React.ReactNode;
};
