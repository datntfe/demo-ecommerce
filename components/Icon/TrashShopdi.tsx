import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 6H6.55556H19"
      stroke="#222631"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 9V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V9M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
      stroke="#222631"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 11V17"
      stroke="url(#paint0_linear_1040_16019)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11V17"
      stroke="url(#paint1_linear_1040_16019)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1040_16019"
        x1="10.5"
        y1="11"
        x2="10.5"
        y2="17"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1040_16019"
        x1="14.5"
        y1="11"
        x2="14.5"
        y2="17"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
    </defs>
  </svg>
);

export default Svg;
