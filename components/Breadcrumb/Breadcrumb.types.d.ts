import React from 'react';

export type TBreadcrumbProps = {
  className?: string;
  options: TBreadcrumbData[];
  separator?: React.ReactNode;
};

export type TBreadcrumbData = {
  link?: string;
  key: string | number;
  title: React.ReactNode;
  onClick?: () => void;
};
