import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import { formatVietnamDong } from 'utils';
import TollTip from 'components/common/Tolltip';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import { Radio } from 'antd';

const StyledShipType = styled.label`
  cursor: pointer;
  padding: 15px;
  .icon-info:hover .toll-tip {
    display: block;
  }
`;

interface ShipTypeItemProps {
  type: string;
  timeDelivery: string;
  shipper: string;
  checked: boolean;
  id: string;
  onChecked: (id: string) => void;
  price: number;
}

const ShipTypeItem: React.FC<ShipTypeItemProps> = ({
  type,
  timeDelivery,
  shipper,
  checked,
  id,
  onChecked,
  price,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const handleChange = () => {
    onChecked(id);
  };

  return (
    <div>
      <StyledShipType
        className="d-flex align-items-center w-100 py-3 justify-content-between"
        htmlFor={id}
      >
        <div className="d-flex align-items-center">
          <Radio
            type="radio"
            checked={checked}
            onChange={handleChange}
            id={id}
          />
          <div className="ml-3">
            <div className="mb-2">
              <b>{type}</b>
            </div>
            <div>
              <Icon name="truck-ship" />
              <span className="ml-2 text-gray3">{t.shippedAt}</span>
              <span className="ml-2 font-bold">{timeDelivery}</span>
            </div>
            <div className="text-gray3 font-size12 ml-5">
              <span>
                {t.shippedBy} {shipper}
              </span>
              |<span>{t.allowToCheckOrder}</span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span className="mr-2 font-bold mt-1">
            {formatVietnamDong(price)}
          </span>
          <div className="relative icon-info">
            <TollTip>{t.tolltipShipped}.</TollTip>
            <Icon name="info" />
          </div>
        </div>
      </StyledShipType>
      {/* {checked && (
        <div>
          <div className="d-flex align-items-center px-5 mt-4">
            <input type="radio" checked />
            <div className="ml-3">
              <div className="font-bold">Từ thứ 2- thứ 6 (8:00 - 18:00)</div>
              <div className="font-size12">Phù hợp với địa chỉ văn phòng/cơ quan.</div>
            </div>
          </div>
          <div className="d-flex align-items-center px-5 mt-4">
            <input type="radio" />
            <div className="ml-3">
              <div className="font-bold">Cả tuần (Trừ CN & ngày lễ)</div>
              <div className="font-size12">Phù hợp với địa chỉ nhà riêng, luôn có người nhận. (8:00 - 18:00)</div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ShipTypeItem;
