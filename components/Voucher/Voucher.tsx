import React from 'react';
import classNames from 'classnames';

import Image from 'next/image';
import { TVoucherProps } from './Voucher.types';

const Voucher: React.FC<TVoucherProps> = ({ disabled, active }) => (
  <div
    className={classNames('Voucher d-flex align-items-center', {
      active,
      disabled,
    })}
  >
    <div className="Voucher-image">
      <Image src="/img/image-voucher.png" layout="fill" />
    </div>
    <div className="Voucher-info">
      <div className="Voucher-info-wrapper d-flex align-items-end justify-content-between">
        <div className="Voucher-info-wrapper-item">
          <div className="Voucher-info-subtitle">Khách hàng mới</div>
          <div className="Voucher-info-title">Giảm 50 SP</div>
          <div className="Voucher-info-description">
            Cho đơn hàng từ 99.000 VND
          </div>
          <div className="Voucher-info-description">
            HSD: 1/10/2021 - 12/12/2022
          </div>
        </div>

        {disabled && (
          <div className="Voucher-info-wrapper-item">
            <div className="Voucher-unavailable">
              <Image src="/img/image-voucher-unavailable.png" layout="fill" />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Voucher;
