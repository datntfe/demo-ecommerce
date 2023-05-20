import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_5224_25567)">
      <path
        d="M11.9998 15.75V3.75C11.9998 3.35218 11.8417 2.97064 11.5604 2.68934C11.2791 2.40804 10.8976 2.25 10.4998 2.25H7.49976C7.10193 2.25 6.7204 2.40804 6.4391 2.68934C6.15779 2.97064 5.99976 3.35218 5.99976 3.75V15.75"
        stroke="#FFD600"
        className="stroke"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.49976"
        y="5.25"
        width="15"
        height="10.5"
        rx="4"
        className="stroke"
        stroke="#222631"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export default Svg;
