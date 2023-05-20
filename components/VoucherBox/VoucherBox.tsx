import React from 'react';
import classNames from 'classnames';

import Button from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TVoucherBoxProps } from './VoucherBox.types';

const VoucherBox: React.FC<TVoucherBoxProps> = () => (
  <div className={classNames('VoucherBox')}>
    <div className="VoucherBox-header d-flex align-items-center">
      <Icon name={EIconName.ShopdiCoin} color={EIconColor.WHITE} />
      <span className="VoucherBox-header-title">200</span>
    </div>
    <div className="VoucherBox-body">
      <div className="VoucherBox-body-item">
        <div className="VoucherBox-body-item-text">Mã: a34dcbbc</div>
      </div>
      <div className="VoucherBox-body-item">
        <div className="VoucherBox-body-item-text">HSD: 31/12/2022</div>
      </div>
      <div className="VoucherBox-body-item">
        <div className="VoucherBox-body-item-text">Ngày đổi: 31/06/2022 </div>
      </div>
    </div>
    <div className="VoucherBox-btn">
      <Button title="Đổi Voucher" size="small" primary />
    </div>
  </div>
);

export default VoucherBox;
