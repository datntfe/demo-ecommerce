import React, { useState } from 'react';

import Input from 'components/Input';
import Icon, { EIconName } from 'components/Icon';
import Button from 'components/Button';
import VoucherModal from 'containers/VoucherModal';
import DeliveryCard from 'components/DeliveryCard';
import ProductHorizontal from 'components/ProductHorizontal';

import AddressCard from 'components/AddressCard';
import { TCartSummaryOrderProps } from './CartSummaryOrder.types';

const CartSummaryOrder: React.FC<TCartSummaryOrderProps> = ({
  onEditAddress,
  onChangeDeliveryMethod,
}) => {
  const [voucherModalState, setVoucherModalState] = useState<{
    visible: boolean;
  }>({ visible: false });

  const handleOpenVoucherModal = (): void => {
    setVoucherModalState({ visible: true });
  };

  const handleCloseVoucherModal = (): void => {
    setVoucherModalState({ visible: false });
  };

  return (
    <div className="CartSummaryOrder">
      <div className="CartSummaryOrder-wrapper">
        <h3 className="CartPage-title">TÓM TẮT ĐƠN HÀNG</h3>

        <div className="CartSummaryOrder-products">
          {[1, 2, 3].map((item) => (
            <ProductHorizontal
              key={item}
              subtitle="Louis Vuitton"
              title="Đồng hồ Tambour Slim Bloom ULess dsadsad"
              price="146.040.000 đ"
              description="Số lượng: x1"
            />
          ))}
        </div>

        <div className="line" />

        <div className="CartSummaryOrder-bill">
          <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between">
            <div className="CartSummaryOrder-bill-text">Mã khuyến mãi</div>
            <div className="CartSummaryOrder-bill-text voucher-available">
              02 có thể dùng
            </div>
          </div>
          <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between form">
            <Input
              prefix={<Icon name={EIconName.TicketShopdi} />}
              placeholder="Nhập mã khuyến mãi"
              size="large"
              noAffixBorder
              readOnly
              onClick={handleOpenVoucherModal}
            />
            <Button primary title="Áp dụng" size="large" />
          </div>
          <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between">
            <div className="CartSummaryOrder-bill-text">Tạm tính</div>
            <div className="CartSummaryOrder-bill-text">
              <strong>146.040.000 đ</strong>
            </div>
          </div>

          <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between">
            <div className="CartSummaryOrder-bill-text">Mã khuyến mãi</div>
            <div className="CartSummaryOrder-bill-text">0 đ</div>
          </div>

          <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between border-bottom-0">
            <div className="CartSummaryOrder-bill-text">Phí vận chuyển</div>
            <div className="CartSummaryOrder-bill-text">Miễn phí</div>
          </div>

          <div className="line" />

          <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between">
            <div className="CartSummaryOrder-bill-text">Tổng cộng</div>
            <div className="CartSummaryOrder-bill-text">
              <strong>146.040.000 đ</strong>
            </div>
          </div>
        </div>

        <br />

        <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between">
          <h3 className="CartPage-title mb-0">ĐỊA CHỈ GIAO HÀNG</h3>
          <div
            className="CartSummaryOrder-bill-text voucher-available cursor-pointer"
            onClick={onEditAddress}
          >
            Chỉnh sửa
          </div>
        </div>

        <AddressCard
          name="Nguyễn Thanh Hiếu"
          phoneNumber="032424475"
          address="50 Quang Trung, Phường xyz, Quận abc, Thành phố qwe, 700000, Việt Nam"
          email="hieunguyenn0001@gmail.com"
          preview
        />

        <br />
        <br />

        <div className="CartSummaryOrder-bill-row d-flex align-items-center justify-content-between">
          <h3 className="CartPage-title mb-0">PHƯƠNG THỨC GIAO HÀNG</h3>
          <div
            className="CartSummaryOrder-bill-text voucher-available cursor-pointer"
            onClick={onChangeDeliveryMethod}
          >
            Chỉnh sửa
          </div>
        </div>

        <DeliveryCard
          preview
          title="Nhanh"
          description={
            <>
              Nhận hàng vào
              <strong>Thứ 2, 18/09 - Thứ 4, 20/09</strong>
            </>
          }
          iconName={EIconName.TruckShopdi}
          price="24.200 đ"
          showTooltip
        />
      </div>

      <VoucherModal {...voucherModalState} onClose={handleCloseVoucherModal} />
    </div>
  );
};

export default CartSummaryOrder;
