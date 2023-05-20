import React from 'react';
import Image from 'next/image';

import { TBrandVerticalProps } from './BrandVertical.types';

const BrandVertical: React.FC<TBrandVerticalProps> = () => (
  <div className="BrandVertical">
    <div className="BrandVertical-image">
      <Image src="/img/image-brand.png" layout="fill" />
    </div>
    <div className="BrandVertical-info">
      <h3 className="BrandVertical-info-title">LOUIS VUITTON</h3>
    </div>
  </div>
);

export default BrandVertical;
