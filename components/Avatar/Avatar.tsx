import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import { TAvatarProps } from './Avatar.types';

const Avatar: React.FC<TAvatarProps> = ({ image, border, size = '3.6rem' }) => (
  <div
    className={classNames('Avatar', { border })}
    style={{
      maxWidth: size,
      flex: `0 0 ${size}`,
      width: size,
      height: size,
    }}
  >
    <Image src={image || ''} layout="fill" />
  </div>
);

export default Avatar;
