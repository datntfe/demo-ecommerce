import React from 'react';

export type TBannerProps = {
  className?: string;
  src: string;
  width: string;
  height?: string;
  overlay?: boolean;
  children?: React.ReactNode;
  useOriginImage?: boolean;
};
