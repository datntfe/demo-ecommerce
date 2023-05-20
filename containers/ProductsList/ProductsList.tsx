import React from 'react';
import { Col, Row } from 'antd';

import ProductVertical from 'components/ProductVertical';
import CategoryHeader from 'components/CategoryHeader';

import { TProductsListProps } from './ProductsList.types';

const ProductsList: React.FC<TProductsListProps> = ({
  title,
  countdown,
  colSpan,
  colXlSpan,
  data = [],
}) => (
  <div className="ProductsList">
    <div className="ProductsList-wrapper">
      {title && <CategoryHeader title={title} countdown={countdown} />}

      <div className="ProductsList-list">
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Col xl={{ span: colXlSpan }} lg={{ span: colSpan || 6 }} span={12}>
              <div key={item} className="ProductsList-list-item">
                <ProductVertical />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  </div>
);

export default ProductsList;
