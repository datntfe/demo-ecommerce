import React, { useState } from 'react';
import Image from 'next/image';

import Icon, { EIconColor, EIconName } from 'components/Icon';
import Button from 'components/Button';
import Amount from 'components/Amount';
import Checkbox from 'components/Checkbox';
import ModalConfirm from 'components/ModalConfirm';

import { TCartProductsProps } from './CartProducts.types';

const CartProducts: React.FC<TCartProductsProps> = ({ onNext }) => {
  const [deleteCartModalState, setDeleteCartModalState] = useState<{
    visible: boolean;
  }>({ visible: false });

  const handleOpenDeleteCartModal = (): void => {
    setDeleteCartModalState({ visible: true });
  };

  const handleCloseDeleteCartModal = (): void => {
    setDeleteCartModalState({ visible: false });
  };

  const handleSubmit = (): void => {
    onNext?.();
  };

  return (
    <div className="CartProducts">
      <div className="CartProducts-wrapper">
        <h3 className="CartPage-title">GIỎ HÀNG CỦA BẠN</h3>

        <div className="CartProducts-main-wrapper">
          <div className="CartProducts-group">
            <div className="CartProducts-group-body d-flex align-items-center">
              <div className="CartProducts-group-body-item tick">
                <Checkbox />
              </div>
              <div className="CartProducts-group-body-item information">
                <div className="CartProducts-group-text">
                  Tất cả (Có 6 sản phẩm)
                </div>
              </div>
              <div className="CartProducts-group-body-item price">
                <div className="CartProducts-group-text text-center">
                  Đơn giá
                </div>
              </div>
              <div className="CartProducts-group-body-item amount d-flex justify-content-center">
                <div className="CartProducts-group-text text-center">
                  Số lượng
                </div>
              </div>
              <div className="CartProducts-group-body-item total">
                <div className="CartProducts-group-text text-center">
                  Thành tiền
                </div>
              </div>
              <div className="CartProducts-group-body-item action d-flex justify-content-center">
                <Icon
                  name={EIconName.TrashShopdi}
                  onClick={handleOpenDeleteCartModal}
                />
              </div>
            </div>
          </div>

          <div className="CartProducts-group">
            <div className="CartProducts-group-header d-flex align-items-center">
              <div className="CartProducts-group-body-item tick">
                <Checkbox />
              </div>
              <div className="CartProducts-group-body-item shop">
                <div className="CartProducts-group-title">
                  Cửa hàng sản phẩm công nghệ ABC
                </div>
                <div className="CartProducts-group-text">Có 3 sản phẩm</div>
              </div>
              <div className="CartProducts-group-body-item arrow">
                <Icon
                  name={EIconName.AngleRight}
                  color={EIconColor.SILVER_CHALICE}
                />
              </div>
            </div>

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="CartProducts-group-body d-flex align-items-center"
              >
                <div className="CartProducts-group-body-item tick">
                  <Checkbox />
                </div>
                <div className="CartProducts-group-body-item information">
                  <div className="CartProducts-group-information d-flex align-items-center">
                    <div className="CartProducts-group-information-image">
                      <Image
                        src="/img/image-product.png"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="CartProducts-information-info">
                      <div className="CartProducts-group-text">
                        Louis Vuitton
                      </div>
                      <div className="CartProducts-group-subtitle">
                        Đồng hồ Tambour Slim Bloom ULess dsadsad
                      </div>
                    </div>
                  </div>
                </div>
                <div className="CartProducts-group-body-item price">
                  <div className="CartProducts-group-text">
                    <del>186.040.000 đ</del>
                  </div>
                  <div className="CartProducts-group-title">
                    <strong>146.040.000 đ</strong>
                  </div>
                </div>
                <div className="CartProducts-group-body-item amount d-flex justify-content-center">
                  <div className="CartProducts-group-text text-center">
                    <Amount min={1} />
                  </div>
                </div>
                <div className="CartProducts-group-body-item total">
                  <div className="CartProducts-group-title">
                    <strong>146.040.000 đ</strong>
                  </div>
                </div>
                <div className="CartProducts-group-body-item action d-flex justify-content-center">
                  <Icon
                    name={EIconName.TrashShopdi}
                    onClick={handleOpenDeleteCartModal}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="CartProducts-submit d-flex justify-content-end">
          <Button
            primary
            title="Mua hàng"
            size="large"
            onClick={handleSubmit}
          />
        </div>
      </div>

      <ModalConfirm
        {...deleteCartModalState}
        title="XÁC NHẬN XÓA"
        description="Bạn có chắc chắn muốn xóa 01 sản phẩm trong giỏ hàng?"
        iconName={EIconName.TrashShopdi}
        onClose={handleCloseDeleteCartModal}
      />
    </div>
  );
};

export default CartProducts;
