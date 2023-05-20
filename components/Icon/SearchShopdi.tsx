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
    <path
      d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
      stroke="#222631"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16634 15.8333C10.0418 15.8333 10.9087 15.6609 11.7176 15.3259C12.5264 14.9908 13.2613 14.4998 13.8804 13.8807C14.4994 13.2617 14.9905 12.5267 15.3255 11.7179C15.6606 10.9091 15.833 10.0421 15.833 9.16667"
      stroke="url(#paint0_linear_4949_51080)"
      strokeWidth="1.5"
    />
    <path
      d="M18.042 18.0415L15.542 15.5415"
      stroke="#222631"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.16667 3.125C5.82995 3.125 3.125 5.82995 3.125 9.16667C3.125 12.5034 5.82995 15.2083 9.16667 15.2083C12.5034 15.2083 15.2083 12.5034 15.2083 9.16667C15.2083 5.82995 12.5034 3.125 9.16667 3.125ZM1.875 9.16667C1.875 5.13959 5.13959 1.875 9.16667 1.875C13.1937 1.875 16.4583 5.13959 16.4583 9.16667C16.4583 13.1937 13.1937 16.4583 9.16667 16.4583C5.13959 16.4583 1.875 13.1937 1.875 9.16667Z"
      fill="#222631"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.4583 9.16667C16.4583 10.1242 16.2697 11.0724 15.9033 11.9571C15.5368 12.8417 14.9997 13.6456 14.3227 14.3227C13.6456 14.9997 12.8417 15.5368 11.9571 15.9033C11.0724 16.2697 10.1242 16.4583 9.16667 16.4583V15.2083C9.96007 15.2083 10.7457 15.0521 11.4787 14.7484C12.2117 14.4448 12.8777 13.9998 13.4388 13.4388C13.9998 12.8777 14.4448 12.2117 14.7484 11.4787C15.0521 10.7457 15.2083 9.96007 15.2083 9.16667H16.4583Z"
      fill="url(#paint1_linear_4949_51080)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0997 15.0997C15.3438 14.8557 15.7395 14.8557 15.9836 15.0997L18.4836 17.5997C18.7277 17.8438 18.7277 18.2396 18.4836 18.4836C18.2395 18.7277 17.8438 18.7277 17.5997 18.4836L15.0997 15.9836C14.8556 15.7396 14.8556 15.3438 15.0997 15.0997Z"
      fill="#222631"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4949_51080"
        x1="15.833"
        y1="9.16667"
        x2="2.49967"
        y2="9.16667"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_4949_51080"
        x1="10.2708"
        y1="1.875"
        x2="10.2708"
        y2="18.6667"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
    </defs>
  </svg>
);

export default Svg;
