import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2246_38800)">
      <path
        d="M12.5 0C5.88346 0 0.5 5.38346 0.5 12C0.5 18.6165 5.88346 24 12.5 24C19.1165 24 24.5 18.6165 24.5 12C24.5 5.38346 19.1165 0 12.5 0ZM19.2068 8.84211L11.5376 16.4511C11.0865 16.9023 10.3647 16.9323 9.88346 16.4812L5.82331 12.782C5.34211 12.3308 5.31203 11.5789 5.73308 11.0977C6.18421 10.6165 6.93609 10.5865 7.41729 11.0376L10.6353 13.985L17.4925 7.12782C17.9737 6.64662 18.7256 6.64662 19.2068 7.12782C19.688 7.60902 19.688 8.3609 19.2068 8.84211Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_2246_38800">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default Svg;
