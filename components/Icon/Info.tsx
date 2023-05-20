import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9.99976" cy="10" r="7.5" stroke={color} strokeWidth="2" />
    <path
      d="M10.4163 6.25016C10.4163 6.48028 10.2298 6.66683 9.99967 6.66683C9.76956 6.66683 9.58301 6.48028 9.58301 6.25016C9.58301 6.02004 9.76956 5.8335 9.99967 5.8335C10.2298 5.8335 10.4163 6.02004 10.4163 6.25016Z"
      fill={color}
      stroke={color}
    />
    <path d="M9.99976 14.1668V8.3335" stroke={color} strokeWidth="2" />
  </svg>
);

export default Svg;
