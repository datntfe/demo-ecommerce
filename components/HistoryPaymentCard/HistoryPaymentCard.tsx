import React from 'react';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from 'components/Icon';

import { THistoryPaymentCardProps } from './HistoryPaymentCard.types.d';

const HistoryPaymentCard: React.FC<THistoryPaymentCardProps> = () => (
  <div className={classNames('HistoryPaymentCard d-flex align-items-center')}>
    <div className="HistoryPaymentCard-icon">
      <Icon name={EIconName.Wallet} />
    </div>
    <div className="HistoryPaymentCard-body">
      <h3 className="HistoryPaymentCard-body-item">Đổi xu</h3>
      <span className="HistoryPaymentCard-body-time">
        15-03-2022 I 08:30:02
      </span>
    </div>
    <div className="HistoryPaymentCard-status">
      <span className="HistoryPaymentCard-status-success d-block">
        Thành công
      </span>
      <span className="HistoryPaymentCard-status-coin d-flex align-items-center">
        +120 <Icon name={EIconName.ShopdiCoin} color={EIconColor.WHITE} />
      </span>
    </div>
  </div>
);

export default HistoryPaymentCard;
