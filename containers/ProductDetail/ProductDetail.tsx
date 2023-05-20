import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Image from 'next/image';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import Button, { EButtonStyleType } from 'components/Button';
import Icon, { EIconName, EIconColor } from 'components/Icon';
import Carousels from 'components/Carousels';
import { TProductDetailProps } from './ProductDetail.types';

const ProductDetail: React.FC<TProductDetailProps> = () => {
  const [productMainCarousel, setProductMainCarousel] = useState<any>();
  const [productListCarousel, setProductListCarousel] = useState<any>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const isSmallDesktop = useMediaQuery({ query: '(max-width: 1200px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

  useEffect(() => {
    if (productMainCarousel?.current && productListCarousel?.current) {
      productMainCarousel?.current?.slickGoTo(activeSlide);
      productListCarousel?.current?.slickGoTo(activeSlide / 2);
    }
  }, [activeSlide, productMainCarousel, productListCarousel]);

  return (
    <div className="ProductDetail">
      <Row gutter={[isSmallDesktop ? 24 : 96, 24]}>
        <Col lg={{ span: 12 }} span={24}>
          <div className="ProductDetail-carousel-main">
            <div className="ProductDetail-carousel-main-badge">
              <img src="/img/image-product-detail-badge.png" alt="" />
            </div>

            <Carousels
              slidesToShow={1}
              slidesToScroll={1}
              infinite={false}
              arrows={false}
              dots={false}
              onInit={setProductMainCarousel}
              onChange={setActiveSlide}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                <div className="ProductDetail-carousel-main-item">
                  <Image
                    src="/img/image-product.png"
                    layout="fill"
                    objectFit={isMobile ? 'contain' : 'cover'}
                  />
                </div>
              ))}
            </Carousels>
          </div>
          <div className="ProductDetail-carousel-list">
            <Carousels
              slidesToShow={4}
              slidesToScroll={2}
              infinite={false}
              arrows
              dots={false}
              arrowLeftIcon={{
                name: EIconName.ArrowLeft,
                color: EIconColor.BLACK,
              }}
              arrowRightIcon={{
                name: EIconName.ArrowRight,
                color: EIconColor.BLACK,
              }}
              responsive={[
                {
                  breakpoint: 575,
                  settings: {
                    arrows: false,
                  },
                },
              ]}
              onInit={setProductListCarousel}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                <div
                  className={classNames('ProductDetail-carousel-list-item', {
                    active: index === activeSlide,
                  })}
                  onClick={(): void => setActiveSlide(index)}
                >
                  <Image
                    src="/img/image-product.png"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </Carousels>
          </div>
        </Col>
        <Col lg={{ span: 12 }} span={24}>
          <h1 className="ProductDetail-title">
            Điện Thoại iPhone 13 128GB - Hàng Chính Hãng Cùng Với Text Giả
            <span className="ProductDetail-title-badge">GIẢM 5%</span>
          </h1>

          <div className="ProductDetail-rate d-flex align-items-center">
            <div className="ProductDetail-rate-stars d-flex">
              <Icon name={EIconName.StarFill} />
              <Icon name={EIconName.StarFill} />
              <Icon name={EIconName.StarFill} />
              <Icon name={EIconName.StarFill} />
              <Icon name={EIconName.StarFill} />
            </div>
            <div className="ProductDetail-rate-text">(1241)</div>
            <div className="ProductDetail-rate-text">Đã bán: 1.241</div>
          </div>

          <div className="ProductDetail-price d-flex align-items-center">
            Giá thị trường
            <del>20.550.000 đ</del>
          </div>

          <div className="ProductDetail-options">
            <Row gutter={[8, 8]}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Col span={8}>
                  <Button
                    title={`Option ${item}`}
                    styleType={EButtonStyleType.OUTLINE_BLACK}
                  />
                </Col>
              ))}
            </Row>
          </div>

          <div className="ProductDetail-delivery d-flex justify-content-between">
            <div className="ProductDetail-delivery-address">
              <Icon name={EIconName.TruckShopdi} />
              Giao hàng đến:{` `}
              <strong>Phường 10, Quận Gò Vấp, Hồ Chí Minh</strong>
            </div>
            <div className="ProductDetail-delivery-change">Đổi địa chỉ</div>
          </div>

          <div className="ProductDetail-action">
            <div className="ProductDetail-action-title d-flex align-items-center">
              Tham gia phiên trong 25s với
              <strong className="d-flex">
                10
                <Icon name={EIconName.ShopdiCoin} color={EIconColor.BLACK} />
              </strong>
            </div>
            <div className="ProductDetail-action-btn">
              <div className="ProductDetail-action-btn-image">
                <Image
                  src="/img/bg-btn-price-secret.gif"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          <div className="ProductDetail-delivery">
            <div className="ProductDetail-delivery-address d-flex">
              Giá rẻ nhất đã từng bán:{` `}
              <strong>***.*55.000 đ</strong>
              <div className="ProductDetail-delivery-change">Xem</div>( 1 SP )
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
