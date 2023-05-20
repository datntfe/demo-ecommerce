import React from 'react';

export type TWrapperLazyLoadProps = {
  maxHeight: number;
  loading?: boolean;
  resetScrollToTop?: boolean;
  resetScrollToBottom?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onResetScrollSuccess?: () => void;
  onTop?: () => void;
  onEnd?: () => void;
  children?: React.ReactNode;
};
