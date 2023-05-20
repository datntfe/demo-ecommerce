import React from 'react';
import { EIconColor, EIconName } from 'components/Icon';

export type TCarouselsProps = {
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  slidesPerRow?: number;
  responsive?: Array<any>;
  onChange?: (slide: number) => void;
  onInit?: (slider: any) => void;
  children?: React.ReactNode;
  arrowLeftIcon?: {
    name: EIconName;
    color: EIconColor;
  };
  arrowRightIcon?: {
    name: EIconName;
    color: EIconColor;
  };
  onDragging?: (dragging: boolean) => void;
};
