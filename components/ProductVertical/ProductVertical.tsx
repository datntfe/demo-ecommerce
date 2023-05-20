import React from 'react';
import Image from 'next/image';
import { Col, Row } from 'antd';

import { Paths } from 'routers';
import Icon, { EIconName } from 'components/Icon';
import CountdownTime from 'components/CountdownTime';
import Button from 'components/Button';
import Link from 'next/link';

import { TProductVerticalProps } from './ProductVertical.types';

const ProductVertical: React.FC<TProductVerticalProps> = () => (
  <div className="ProductVertical">
    <Link href={Paths.ProductDetail('1')} passHref>
      <div className="ProductVertical-image">
        <Image src="/img/image-product.png" layout="fill" />

        <div className="ProductVertical-image-badge">
          <Image src="/img/image-product-badge.png" layout="fill" />
          <span className="ProductVertical-image-badge-label">- 10 ~ 60%</span>
        </div>
      </div>
    </Link>
    <div className="ProductVertical-info">
      <div className="ProductVertical-info-row">
        <Row justify="space-between" align="middle">
          <Col>
            <div className="ProductVertical-info-title">Apple</div>
          </Col>
          <Col>
            <div className="ProductVertical-info-favorite">
              <Icon name={EIconName.HeartFill} />
            </div>
          </Col>
        </Row>
      </div>

      <div className="ProductVertical-info-row">
        <Row align="middle" justify="space-between">
          <Col>
            <div className="ProductVertical-info-subtitle">Đã bán: 172 </div>
          </Col>
          <Col>
            <div className="ProductVertical-info-countdown d-flex align-items-center">
              <Icon name={EIconName.Clock} />
              <CountdownTime defaultValue="10:00:00" />
            </div>
          </Col>
        </Row>
      </div>

      <div className="ProductVertical-info-description">
        Điện thoại Iphone 13 256 GB Trắng
      </div>

      <div className="ProductVertical-info-rate">
        <Row>
          <Col>
            <Icon name={EIconName.StarFill} />
          </Col>
          <Col>
            <Icon name={EIconName.StarFill} />
          </Col>
          <Col>
            <Icon name={EIconName.StarFill} />
          </Col>
          <Col>
            <Icon name={EIconName.StarFill} />
          </Col>
          <Col>
            <Icon name={EIconName.StarFill} />
          </Col>
          <Col>
            <div className="ProductVertical-info-rate-label">(172)</div>
          </Col>
        </Row>
      </div>

      <div className="ProductVertical-prices d-flex align-items-center justify-content-between">
        <del>25.990.000đ</del>
        <span>28.990.000 đ</span>
      </div>

      <div className="ProductVertical-btns">
        <Link href={Paths.ProductDetail('1')} passHref>
          <div className="ProductVertical-btns-item">
            <Button title="Mua Ngay" primary size="small" />
          </div>
        </Link>
        <Link href={Paths.ProductDetail('1')} passHref>
          <div className="ProductVertical-btns-item buy">
            <Button
              title={
                <div className="d-flex align-items-center justify-content-between">
                  <span>Mua ngay</span>
                  <span>28.990.000 đ</span>
                </div>
              }
              size="small"
            />
          </div>
        </Link>
        <Link href={Paths.ProductDetail('1')} passHref>
          <div className="ProductVertical-btns-item unlock">
            <Image
              src="/img/bg-btn-unlock-small.gif"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default ProductVertical;
