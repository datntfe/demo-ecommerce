import React from 'react';

import ProductsList from 'containers/ProductsList';
import GuestLayout from 'layouts/GuestLayout';
import Breadcrumb from 'components/Breadcrumb';
import { Paths } from 'routers';
import Banner from 'components/Banner';

const AllProduct: React.FC = () => {
  const dataBreadcrumb = [
    { link: Paths.Home, key: 'home', title: 'Trang Chủ' },
    { key: 'search', title: 'Tìm Kiếm' },
    { key: 'type', title: 'Hot Deal' },
  ];

  return (
    <GuestLayout>
      <div className="AllProduct">
        <div className="AllProduct-wrapper">
          <div className="container">
            <Breadcrumb options={dataBreadcrumb} />
            <Banner
              overlay
              src="/img/image-brand-block.png"
              width="100%"
              height="42rem"
            />
            <ProductsList />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default AllProduct;
