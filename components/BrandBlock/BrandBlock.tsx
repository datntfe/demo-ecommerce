import React from 'react';
import Link from 'next/link';

import Banner from 'components/Banner';
import Button, { EButtonStyleType } from 'components/Button';
import { Paths } from 'routers';

import { TBrandBlockProps } from './BrandBlock.types';

const BrandBlock: React.FC<TBrandBlockProps> = ({ title, src }) => (
  <div className="BrandBlock">
    <Banner overlay width="100%" height="42rem" src={src}>
      <div className="Banner-wrapper d-flex align-items-center justify-content-center flex-column">
        <h2 className="BrandBlock-title">{title}</h2>
        <Link href={Paths.AllProducts('type')} passHref>
          <Button
            size="large"
            title="CHI TIẾT"
            styleType={EButtonStyleType.OUTLINE_WHITE}
          />
        </Link>
      </div>
    </Banner>
  </div>
);

export default BrandBlock;
