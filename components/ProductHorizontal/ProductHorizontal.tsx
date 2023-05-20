import React from 'react';
import { Col, Row } from 'antd';
import Image from 'next/image';
import classNames from 'classnames';

import Button from 'components/Button';

import { TProductHorizontalProps } from './ProductHorizontal.types.d';

const ProductHorizontal: React.FC<TProductHorizontalProps> = ({
  subtitle,
  price,
  title,
  description,
  buttonProps,
  size = 'middle',
}) => (
  <div className={classNames('ProductHorizontal', size)}>
    <Row gutter={[24, 16]} align="middle" wrap={false}>
      <Col>
        <div className="ProductHorizontal-image">
          <Image src="/img/image-product.png" layout="fill" />
        </div>
      </Col>
      <Col flex={1}>
        <div className="ProductHorizontal-info">
          {subtitle && (
            <div className="ProductHorizontal-info-description">{subtitle}</div>
          )}

          <div className="ProductHorizontal-info-title">{title}</div>

          {price && <div className="ProductHorizontal-info-price">{price}</div>}

          <div className="ProductHorizontal-info-description">
            {description}
          </div>
        </div>
      </Col>
      {buttonProps && (
        <Col>
          <div className="ProductHorizontal-btn">
            <Button primary size="large" {...buttonProps} />
          </div>
        </Col>
      )}
    </Row>
  </div>
);

export default ProductHorizontal;
