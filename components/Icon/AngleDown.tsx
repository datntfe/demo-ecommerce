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
      d="M10.5001 13.2061C10.7199 13.1998 10.9208 13.1182 11.084 12.9424L15.8552 8.05818C15.9933 7.92006 16.0686 7.74428 16.0686 7.53711C16.0686 7.12277 15.7422 6.79004 15.3278 6.79004C15.127 6.79004 14.9323 6.87165 14.7879 7.01604L10.5064 11.4169L6.21233 7.01604C6.06794 6.87793 5.8796 6.79004 5.67243 6.79004C5.25809 6.79004 4.93164 7.12277 4.93164 7.53711C4.93164 7.74428 5.00698 7.92006 5.14509 8.05818L9.92257 12.9424C10.0921 13.1182 10.2804 13.2061 10.5001 13.2061Z"
      fill={color}
    />
  </svg>
);

export default Svg;
