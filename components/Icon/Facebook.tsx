import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.333984 10.0558C0.333984 15.0275 3.94482 19.1617 8.66732 20V12.7775H6.16732V10H8.66732V7.7775C8.66732 5.2775 10.2782 3.88917 12.5565 3.88917C13.2782 3.88917 14.0565 4 14.7782 4.11083V6.66667H13.5007C12.2782 6.66667 12.0007 7.2775 12.0007 8.05583V10H14.6673L14.2232 12.7775H12.0007V20C16.7232 19.1617 20.334 15.0283 20.334 10.0558C20.334 4.525 15.834 0 10.334 0C4.83398 0 0.333984 4.525 0.333984 10.0558Z"
      fill={color}
    />
  </svg>
);

export default Svg;
