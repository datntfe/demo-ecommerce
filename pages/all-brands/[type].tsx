import React from 'react';

import GuestLayout from 'layouts/GuestLayout';
import Breadcrumb from 'components/Breadcrumb';
import { Paths } from 'routers';
import BrandBlock from 'components/BrandBlock';

const AllBrands: React.FC = () => {
  const dataBreadcrumb = [
    { link: Paths.Home, key: 'home', title: 'Trang Chủ' },
    { key: 'search', title: 'Tìm Kiếm' },
    { key: 'brand', title: 'Thương Hiệu' },
  ];

  return (
    <GuestLayout>
      <div className="AllBrands">
        <div className="AllBrands-wrapper">
          <div className="container">
            <Breadcrumb options={dataBreadcrumb} />
            <BrandBlock src="/img/image-brand-block.png" title="APPLE" />
            <BrandBlock src="/img/image-brand-block.png" title="SAMSUNG" />
            <BrandBlock src="/img/image-brand-block.png" title="VERTU" />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default AllBrands;
