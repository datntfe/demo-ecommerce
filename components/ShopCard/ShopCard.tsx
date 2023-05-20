import React from 'react';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import Image from 'next/image';

import Button, { EButtonStyleType } from 'components/Button';
import { TShopCardProps } from './ShopCard.types.d';

const ShopCard: React.FC<TShopCardProps> = ({
  logo = '',
  title,
  subtitle,
  description,
  showShop,
  background,
  amountProduct,
  percentResponse,
  response,
  size = 'large',
}) => (
  <div className={classNames('ShopCard', size, { background })}>
    {background && (
      <div className="ShopCard-background">
        <Image src={background} layout="fill" objectFit="cover" />
      </div>
    )}

    <div className="ShopCard-wrapper">
      <Row align="middle" justify="space-between">
        <Col>
          <div className="ShopCard-brand d-flex align-items-center">
            <div className="ShopCard-brand-logo">
              <Image src={logo} layout="fill" objectFit="cover" />
            </div>
            <div>
              <div className="ShopCard-brand-title">{title}</div>
              <div className="ShopCard-brand-subtitle">{subtitle}</div>
              {description && (
                <div className="ShopCard-brand-description">{description}</div>
              )}
            </div>
          </div>
        </Col>
        <Col>
          <div className="ShopCard-info d-flex align-items-center">
            <div className="ShopCard-info-item">
              <div className="ShopCard-info-item-title">{amountProduct}</div>
              <div className="ShopCard-info-item-description">Sản Phẩm</div>
            </div>
            <div className="ShopCard-info-item">
              <div className="ShopCard-info-item-title">{percentResponse}</div>
              <div className="ShopCard-info-item-description">
                Tỉ lệ phản hồi
              </div>
            </div>
            <div className="ShopCard-info-item">
              <div className="ShopCard-info-item-title">{response}</div>
              <div className="ShopCard-info-item-description">Phản hồi</div>
            </div>
          </div>
        </Col>

        {showShop && (
          <Col>
            <div className="ShopCard-btn">
              <Button
                size="small"
                title="Xem Shop"
                styleType={EButtonStyleType.OUTLINE_WHITE}
              />
            </div>
          </Col>
        )}
      </Row>
    </div>
  </div>
);

export default ShopCard;
