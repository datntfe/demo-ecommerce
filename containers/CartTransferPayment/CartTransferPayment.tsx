import React from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import Icon, { EIconColor, EIconName } from 'components/Icon';

import Copy from 'components/Copy';
import { TCartTransferPaymentProps } from './CartTransferPayment.types';

const CartTransferPayment: React.FC<TCartTransferPaymentProps> = ({
  onNext,
}) => (
  <div className="CartTransferPayment">
    <div className="CartTransferPayment-wrapper">
      <h3 className="CartPage-title">THÔNG TIN CHUYỂN KHOẢN</h3>

      <div className="CartTransferPayment-card">
        <div className="CartTransferPayment-card-header d-flex align-items-start">
          <div className="CartTransferPayment-card-header-item">
            <div className="CartTransferPayment-description mb-1">
              <strong>Nội dung chuyển khoản</strong>
            </div>
            <div className="CartTransferPayment-description gray mb-0">
              Vui lòng sao chép hoặc ghi chính xác nội dung chuyển khoản phía
              dưới
            </div>
          </div>
        </div>
        <div className="CartTransferPayment-card-body">
          <Input
            value="chuyen khoan don hang SD1234"
            readOnly
            size="large"
            noAffixBorder
            suffix={<Copy text="chuyen khoan don hang SD1234" />}
          />
        </div>
      </div>

      <h3 className="CartPage-title">THÔNG TIN NGƯỜI NHẬN</h3>
      <div className="CartTransferPayment-description gray">
        Vui lòng sao chép hoặc ghi chính xác thông tin người nhận phía dưới
      </div>
      <div className="CartTransferPayment-search d-flex">
        <Input
          placeholder="Tìm kiếm ngân hàng"
          prefix={<Icon name={EIconName.Search} color={EIconColor.BLACK} />}
        />
      </div>

      <div className="CartTransferPayment-card">
        <div className="CartTransferPayment-card-header d-flex align-items-start">
          <div className="CartTransferPayment-card-header-item">
            <div className="CartTransferPayment-description gray mb-1">
              Ngân hàng
            </div>
            <div className="CartTransferPayment-description mb-0">
              <strong>VP Bank - Chi nhánh SAI GON</strong>
            </div>
          </div>

          <div className="CartTransferPayment-card-header-item">
            <div className="CartTransferPayment-description gray mb-1">
              Tên tài khoản
            </div>
            <div className="CartTransferPayment-description mb-0">
              <strong>CÔNG TY CỔ PHẦN THƯƠNG MẠI ĐIỆN TỬ SHOPDI</strong>
            </div>
          </div>
        </div>
        <div className="CartTransferPayment-card-body">
          <Input
            value="STK - 005704070268268"
            readOnly
            size="large"
            noAffixBorder
            suffix={<Copy text="STK - 005704070268268" />}
          />
        </div>
      </div>

      <div className="CartTransferPayment-warning">
        Lưu ý: Chúng tôi không sử dụng bất kì tài khoản ngân hàng nào khác ngoài
        các tài khoản được liệt kê trên, quý khách hàng vui lòng kiểm tra kỹ
        thông tin chuyển khoản để tránh các trường hợp lừa đảo
      </div>

      <div className="CartTransferPayment-description">
        Sau khi chuyển khoản thành công, Quý khách vui lòng xác nhận{' '}
        <strong>“Đã chuyển khoản”</strong>
      </div>

      <div className="CartTransferPayment-submit d-flex justify-content-end">
        <Button size="large" title="Đã chuyển khoản" primary onClick={onNext} />
      </div>
    </div>
  </div>
);

export default CartTransferPayment;
