import Button from 'components/Button';
import Copy from 'components/Copy';
import { ECopyType } from 'components/Copy/Copy.enums';
import Input from 'components/Input';
import React from 'react';

import { TCartOrderSuccessProps } from './CartOrderSuccess.types';

const CartOrderSuccess: React.FC<TCartOrderSuccessProps> = () => (
  <div className="CartOrderSuccess">
    <div className="CartOrderSuccess-wrapper">
      <h3 className="CartOrderSuccess-title">Đặt hàng thành công!</h3>

      <div className="CartOrderSuccess-description">
        Trạng thái: <span>Đã thanh toán</span>
      </div>

      <div className="CartOrderSuccess-order-code d-flex align-items-center justify-content-center">
        <div className="CartOrderSuccess-description">Mã đơn hàng</div>
        <Input
          value="SDHUDSHDU"
          suffix={<Copy type={ECopyType.ICON} text="SDHUDSHDU" />}
          noAffixBorder
          readOnly
        />
      </div>

      <div className="CartOrderSuccess-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae mollis
        pharetra, et habitant tempus nulla nibh ultricies. Morbi gravida egestas
        enim scelerisque nunc, vulputate integer facilisi. Porttitor cursus
        proin accumsan, maecenas massa ornare felis. A faucibus eget sit quam.
        Aliquam malesuada nunc, massa elit, in condimentum dolor tristique
        massa.
      </div>

      <div className="CartOrderSuccess-submit d-flex justify-content-center">
        <Button size="large" title="Theo dõi đơn hàng" primary />
      </div>
    </div>
  </div>
);

export default CartOrderSuccess;
