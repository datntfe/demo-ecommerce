import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import { formatVietnamDong } from 'utils';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

const StyledShipType = styled.div`
  border: 1px solid #cccccc;
  padding: 15px;
  border-radius: 8px;
  .icon-info:hover .toll-tip {
    display: block;
  }
`;

interface ShipTypeItemProductProps {
  type: string;
  timeDelivery: string;
  shipper: string;
  price: number;
}

const ShipTypeItemProduct: React.FC<ShipTypeItemProductProps> = ({
  type,
  timeDelivery,
  shipper,
  price,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <StyledShipType className="d-flex align-items-center w-100 py-3 justify-content-between">
      <div className="d-flex align-items-center">
        <Icon name="truck-ship" />
        <div className="ml-3">
          <div className="">
            {t.shipping}: <b>{type}</b>
          </div>
          <div>
            <span className="text-gray3">{t.shippingAt}</span>
            <span className="ml-2 font-bold text-blue">{timeDelivery}</span>
          </div>
          <div className="text-gray3 font-size12">
            <span className="text-gray3">{t.shippingFee}:&nbsp;</span>
            <span>
              <b>{formatVietnamDong(price)}</b>
            </span>
            {/* <span className="text-gray3 ml-2">(Freeship 30K đơn hàng từ 150K)</span> */}
          </div>
        </div>
      </div>
    </StyledShipType>
  );
};

export default ShipTypeItemProduct;
