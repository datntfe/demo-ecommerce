import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={12} viewBox="0 0 14 12" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.4137 0.162269C13.7085 0.413295 13.7519 0.865509 13.5107 1.17232L5.23491 11.6997C5.00089 11.9974 4.58301 12.0502 4.28736 11.8194L0.609214 8.94828C0.304507 8.71043 0.242754 8.26053 0.471284 7.94339C0.699815 7.62626 1.13209 7.56199 1.4368 7.79984L4.58604 10.2581L12.4432 0.263274C12.6844 -0.0435348 13.1189 -0.0887562 13.4137 0.162269Z" fill="#222631" />
    <path d="M4.85427 12L4.85427 10.4675L1.4368 7.79984C1.13209 7.56199 0.699815 7.62626 0.471284 7.94339C0.242754 8.26053 0.304507 8.71043 0.609214 8.94828L4.28736 11.8194C4.37804 11.8902 4.48074 11.9345 4.58619 11.953L4.85427 12Z" fill="url(#paint0_linear_5313_19579)" />
    <defs>
      <linearGradient id="paint0_linear_5313_19579" x1="6.99998" y1={0} x2="6.99998" y2={12} gradientUnits="userSpaceOnUse">
        <stop offset="0.0349758" stopColor="#FFD600" />
        <stop offset="0.966035" stopColor="#FFC200" />
      </linearGradient>
    </defs>
  </svg>
);

export default Svg;
