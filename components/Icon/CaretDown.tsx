import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg
    width="16"
    height="11"
    viewBox="0 0 16 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8464 3.00631C11.8464 2.72663 11.5545 2.52982 11.0884 2.52982L5.05218 2.52637C4.59075 2.52637 4.29883 2.72318 4.29883 3.00286C4.29883 3.14788 4.38358 3.26873 4.49187 3.43447L7.35931 7.78505C7.56648 8.09236 7.77836 8.20975 8.07028 8.20975C8.3622 8.20975 8.57879 8.09236 8.78596 7.78505L11.6534 3.43447C11.7617 3.27218 11.8464 3.15133 11.8464 3.00631Z"
      fill={color}
    />
  </svg>
);

export default Svg;
