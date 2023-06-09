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
      d="M15.3614 4.32227H4.63245C3.27642 4.32227 2.56702 5.02539 2.56702 6.36886V6.93387H17.4268V6.36886C17.4268 5.02539 16.7237 4.32227 15.3614 4.32227ZM5.19118 13.1929C4.82078 13.1929 4.56967 12.9481 4.56967 12.5903V11.4289C4.56967 11.0773 4.82078 10.8262 5.19118 10.8262H6.72927C7.09338 10.8262 7.3445 11.0773 7.3445 11.4289V12.5903C7.3445 12.9481 7.09338 13.1929 6.72927 13.1929H5.19118ZM4.63245 15.2019H15.3614C16.7237 15.2019 17.4268 14.4925 17.4268 13.149V8.40918H2.56702V13.149C2.56702 14.4987 3.27642 15.2019 4.63245 15.2019Z"
      fill={color}
    />
  </svg>
);

export default Svg;
