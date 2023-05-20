import React from 'react';

import GuestLayout from 'layouts/GuestLayout';
import { Paths } from 'routers';
import Breadcrumb from 'components/Breadcrumb';
import ProductsCarousel from 'containers/ProductsCarousel';
import ShopCard from 'components/ShopCard';
import Tabs from 'components/Tabs';
import ProductDetailContent from 'containers/ProductDetailContent';
import ProductDetailRate from 'containers/ProductDetailRate';
import ProductDetail from 'containers/ProductDetail';

const ProductPage: React.FC = () => {
  const dataBreadcrumb = [
    { link: Paths.Home, key: 'home', title: 'Trang Chủ' },
    {
      link: Paths.CategoryPage('type'),
      key: 'category',
      title: 'Danh Mục Sản Phẩm',
    },
    { key: 'name', title: 'Điện Thoại iPhone' },
  ];

  const dataProductTabsOptions = [
    {
      key: 'description',
      title: 'Mô tả',
      children: <ProductDetailContent />,
    },
    {
      key: 'rate',
      title: 'Đánh giá',
      children: <ProductDetailRate />,
    },
  ];

  return (
    <GuestLayout>
      <div className="ProductPage">
        <div className="ProductPage-wrapper">
          <div className="container">
            <Breadcrumb options={dataBreadcrumb} />

            <ProductDetail />

            <ShopCard
              logo="/img/logo-shop.png"
              title="Louis Vuitton"
              subtitle="Louis Vuitton Store"
              description="1k2 Người theo dõi | 5.0 Đánh giá"
              size="large"
              amountProduct="219"
              percentResponse="100%"
              response="Trong vài giờ"
            />

            <Tabs data={dataProductTabsOptions} />

            <ProductsCarousel title="SẢN PHẨM TƯƠNG TỰ" />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default ProductPage;
