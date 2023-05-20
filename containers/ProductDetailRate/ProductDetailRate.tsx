import React from 'react';
import { Col, Row } from 'antd';
import Image from 'next/image';

import Comment from 'components/Comment';
import Button, { EButtonStyleType } from 'components/Button';

import Icon, { EIconName } from 'components/Icon';
import { TProductDetailRateProps } from './ProductDetailRate.types';

const ProductDetailRate: React.FC<TProductDetailRateProps> = () => {
  const dataOverviewRate = [
    { label: '5', value: 70 },
    { label: '4', value: 18 },
    { label: '3', value: 7 },
    { label: '2', value: 2 },
    { label: '1', value: 1 },
  ];

  return (
    <div className="ProductDetailRate">
      <div className="ProductDetailRate-main">
        <Row wrap={false} align="middle" gutter={[0, 24]}>
          <Col>
            <div className="ProductDetailRate-overview">
              <div className="ProductDetailRate-overview-header d-flex align-items-center justify-content-center">
                <div className="ProductDetailRate-overview-header-title">
                  4.6
                </div>
                <div className="ProductDetailRate-overview-header-stars d-flex">
                  <Icon name={EIconName.StarFill} />
                  <Icon name={EIconName.StarFill} />
                  <Icon name={EIconName.StarFill} />
                  <Icon name={EIconName.StarFill} />
                  <Icon name={EIconName.StarFill} />
                </div>
                <div className="ProductDetailRate-overview-header-text">
                  20 đánh giá
                </div>
              </div>
              <div className="ProductDetailRate-overview-body">
                {dataOverviewRate.map((item) => (
                  <div className="ProductDetailRate-overview-body-item d-flex align-items-center">
                    <div className="ProductDetailRate-overview-body-item-text d-flex align-items-center">
                      {item.label} <Icon name={EIconName.StarFill} />
                    </div>
                    <div className="ProductDetailRate-overview-body-item-bar">
                      <div
                        className="ProductDetailRate-overview-body-item-bar-process"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <div className="ProductDetailRate-overview-body-item-text d-flex align-items-center justify-content-end">
                      {item.value}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col flex={1}>
            <div className="ProductDetailRate-images">
              <Row gutter={[8, 8]}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(() => (
                  <Col>
                    <div className="ProductDetailRate-images-item">
                      <Image
                        src="/img/image-product.png"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <div className="ProductDetailRate-comments">
        {[1, 2, 3, 4].map(() => (
          <Comment />
        ))}

        <div className="ProductDetailRate-comments-load-more d-flex justify-content-center">
          <Button
            title="Xem thêm 20 đánh giá"
            size="small"
            styleType={EButtonStyleType.OUTLINE_BLACK}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailRate;
