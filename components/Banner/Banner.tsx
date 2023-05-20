import React from 'react';
import Image from 'next/image';

import { TBannerProps } from './Banner.types';

const Banner: React.FC<TBannerProps> = ({
  src,
  width,
  height,
  overlay,
  useOriginImage,
  children,
}) => (
  <div className="Banner">
    {overlay && <div className="Banner-overlay" />}
    <div className="Banner-image" style={{ width, height }}>
      {useOriginImage ? (
        <img src={src} alt="" />
      ) : (
        <Image src={src} alt="" layout="fill" objectFit="cover" />
      )}
    </div>

    {children && (
      <div className="Banner-body">
        <div className="container">{children}</div>
      </div>
    )}
  </div>
);

export default Banner;
