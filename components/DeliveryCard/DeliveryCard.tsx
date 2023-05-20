import React from 'react';
import classNames from 'classnames';
import { Col, Row } from 'antd';

import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TDeliveryCardProps } from './DeliveryCard.types';

const DeliveryCard: React.FC<TDeliveryCardProps> = ({
  title,
  description,
  iconName,
  iconColor,
  showTooltip,
  price,
  preview,
}) => (
  <div className={classNames('DeliveryCard', { preview })}>
    <Row gutter={[16, 16]} align="middle" wrap={false}>
      {!preview && (
        <Col>
          <div className="DeliveryCard-check active" />
        </Col>
      )}
      <Col flex={1}>
        <div className="DeliveryCard-info">
          <div className="DeliveryCard-info-title">{title}</div>
          <div className="DeliveryCard-info-description">
            <Icon name={iconName} color={iconColor} />
            {description}
          </div>
        </div>
      </Col>
      {price && (
        <Col>
          <div className="DeliveryCard-info-title text-nowrap mb-0">
            {price}
          </div>
        </Col>
      )}
      {showTooltip && (
        <Col>
          <div className="DeliveryCard-tooltip">
            <Icon name={EIconName.Info} color={EIconColor.GRAY} />
          </div>
        </Col>
      )}
    </Row>
  </div>
);

export default DeliveryCard;
