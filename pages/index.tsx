import React from 'react';

import GuestLayout from 'layouts/GuestLayout';
import Banner from 'components/Banner';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import ProductsCarousel from 'containers/ProductsCarousel';
import ProductsList from 'containers/ProductsList';
import BrandsList from 'containers/BrandsList';

const HomePage: React.FC = () => (
  <GuestLayout>
    <div className="HomePage">
      <div className="HomePage-banner">
        <Banner src="/img/image-home-banner.png" width="100%" height="72rem">
          <div className="Banner-wrapper d-flex align-items-center">
            <div className="Banner-wrapper-item">
              <div className="Banner-title">
                Săn cực phẩm,
                <br />
                Giá cực sốc!
              </div>
              <div className="Banner-description">
                Săn thương hiệu với giá tốt nhất.
              </div>
            </div>
          </div>
        </Banner>
      </div>

      <div className="container">
        <div className="HomePage-video">
          <Banner
            src="/img/image-home-video-thumbnail.png"
            width="100%"
            overlay
            height="56rem"
          >
            <div className="Banner-wrapper d-flex align-items-center justify-content-center">
              <div className="HomePage-video-btn">
                <Icon name={EIconName.PlayCircle} color={EIconColor.WHITE} />
              </div>
            </div>
          </Banner>
        </div>

        <ProductsCarousel title="SẢN PHẨM GIỚI HẠN" countdown="02:00:00" />

        <div className="HomePage-banner">
          <Banner
            src="/img/image-home-banner-2.png"
            width="100%"
            height="56rem"
            overlay
          >
            <div className="Banner-wrapper d-flex align-items-center justify-content-center">
              <div className="Banner-title">IPHONE 13</div>
            </div>
          </Banner>
        </div>

        <ProductsCarousel title="HOT DEAL" />
      </div>

      <div className="HomePage-banner">
        <Banner
          src="/img/image-home-banner-3.png"
          width="100%"
          useOriginImage
        />
      </div>

      <div className="container">
        <BrandsList title="THƯƠNG HIỆU NỔI BẬT" />

        <ProductsList title="GỢI Ý HÔM NAY" />
      </div>
    </div>
  </GuestLayout>
);

export default HomePage;
