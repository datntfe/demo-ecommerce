import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="242"
    height="241"
    viewBox="0 0 242 241"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_b_3659_51411)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M120.768 210.875C170.68 210.875 211.143 170.413 211.143 120.5C211.143 70.5873 170.68 30.125 120.768 30.125C70.8548 30.125 30.3926 70.5873 30.3926 120.5C30.3926 170.413 70.8548 210.875 120.768 210.875ZM92.4253 71.2821L179.444 119.626C180.13 120.007 180.13 120.993 179.444 121.374L92.4253 169.718C91.6255 170.162 90.6426 169.584 90.6426 168.669V72.3311C90.6426 71.4161 91.6255 70.8377 92.4253 71.2821Z"
        fill={color}
      />
    </g>
    <defs>
      <filter
        id="filter0_b_3659_51411"
        x="-3.73242"
        y="-4"
        width="249"
        height="249"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3659_51411"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3659_51411"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Svg;
