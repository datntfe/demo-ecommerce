import React, { useState } from 'react';

import Modal from 'components/Modal';
import Button from 'components/Button';
import DeliveryCard from 'components/DeliveryCard';
import { EIconName } from 'components/Icon';

import { TDeliveryMethodModalProps } from './DeliveryMethodModal.types';

const DeliveryMethodModal: React.FC<TDeliveryMethodModalProps> = ({
  visible,
  onClose,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState();

  return (
    <Modal
      className="DeliveryMethodModal"
      visible={visible}
      onClose={onClose}
      width={830}
      title="PHƯƠNG THỨC VẬN CHUYỂN"
    >
      <div className="DeliveryMethodModal-wrapper">
        <div className="DeliveryMethodModal-method">
          <DeliveryCard
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
          <DeliveryCard
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
          <DeliveryCard
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

        <div className="DeliveryMethodModal-submit flex justify-content-end">
          <Button title="Lưu" primary size="large" />
        </div>
      </div>
    </Modal>
  );
};

export default DeliveryMethodModal;
