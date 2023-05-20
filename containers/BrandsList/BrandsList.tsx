import React from 'react';
import { Col, Row } from 'antd';

import CategoryHeader from 'components/CategoryHeader';
import BrandVertical from 'components/BrandVertical';
import { Paths } from 'routers';

import { TBrandsListProps } from './BrandsList.types';

const BrandsList: React.FC<TBrandsListProps> = ({
  title,
  countdown,
  data = [],
}) => (
  <div className="BrandsList">
    <div className="BrandsList-wrapper">
      <CategoryHeader
        title={title}
        countdown={countdown}
        link={Paths.AllBrands('type')}
      />

      <div className="BrandsList-list">
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Col lg={{ span: 8 }} span={12}>
              <div key={item} className="BrandsList-list-item">
                <BrandVertical />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  </div>
);

export default BrandsList;
