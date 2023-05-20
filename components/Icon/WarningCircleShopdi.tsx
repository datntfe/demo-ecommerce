import React from 'react';

import { TIconProps } from './Icon.types';

const Svg: React.FC<TIconProps> = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.53846C7.32682 3.53846 3.53846 7.32682 3.53846 12C3.53846 16.6732 7.32682 20.4615 12 20.4615C16.6732 20.4615 20.4615 16.6732 20.4615 12C20.4615 7.32682 16.6732 3.53846 12 3.53846ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
      fill="#222631"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 7.12821C12.4248 7.12821 12.7692 7.4726 12.7692 7.89744V13.0256C12.7692 13.4505 12.4248 13.7949 12 13.7949C11.5752 13.7949 11.2308 13.4505 11.2308 13.0256V7.89744C11.2308 7.4726 11.5752 7.12821 12 7.12821Z"
      fill="url(#paint0_linear_1102_12093)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2308 16.1026C11.2308 15.6777 11.5752 15.3333 12 15.3333H12.0103C12.4351 15.3333 12.7795 15.6777 12.7795 16.1026C12.7795 16.5274 12.4351 16.8718 12.0103 16.8718H12C11.5752 16.8718 11.2308 16.5274 11.2308 16.1026Z"
      fill="url(#paint1_linear_1102_12093)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1102_12093"
        x1="12"
        y1="2"
        x2="12"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1102_12093"
        x1="12"
        y1="2"
        x2="12"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
    </defs>
  </svg>
);

export default Svg;
