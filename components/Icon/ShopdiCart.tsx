import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.46484 5.58398C5.05063 5.58398 4.71484 5.91977 4.71484 6.33398C4.71484 6.7482 5.05063 7.08398 5.46484 7.08398H8.58913C8.69674 7.08398 8.79227 7.15284 8.8263 7.25493L8.9586 7.65181L9.10647 8.25581L11.2874 17.1639C11.5886 18.3945 12.6916 19.26 13.9585 19.26H24.5469C25.3525 19.26 26.0541 18.7099 26.2463 17.9275L28.3183 9.49504C28.5893 8.39226 27.7544 7.32747 26.6188 7.32747H10.4316L10.2493 6.78059C10.0111 6.06599 9.34239 5.58398 8.58913 5.58398H5.46484ZM12.7443 16.8072L10.7907 8.82747H26.6188C26.7811 8.82747 26.9003 8.97958 26.8616 9.13712L24.7897 17.5696C24.7622 17.6814 24.662 17.76 24.5469 17.76H13.9585C13.3826 17.76 12.8813 17.3666 12.7443 16.8072Z"
      fill="#222631"
    />
    <circle
      cx="23.4089"
      cy="25.5592"
      r="1.17252"
      stroke="#222631"
      strokeWidth="1.5"
    />
    <path
      d="M15.6087 25.5592C15.6087 26.2068 15.0838 26.7318 14.4362 26.7318C13.7886 26.7318 13.2637 26.2068 13.2637 25.5592C13.2637 24.9117 13.7886 24.3867 14.4362 24.3867C15.0838 24.3867 15.6087 24.9117 15.6087 25.5592Z"
      stroke="#222631"
      strokeWidth="1.5"
    />
    <path
      d="M12.5137 21.7139H25.3305"
      stroke="url(#paint0_linear_5173_6993)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5173_6993"
        x1="18.9221"
        y1="21.7139"
        x2="18.9221"
        y2="22.7139"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
    </defs>
  </svg>
);

export default Svg;
