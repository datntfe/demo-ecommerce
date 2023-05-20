import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import TypeLabel from 'components/address/TypeLabel/TypeLabel';

interface StyledWrapProps {
  isSelected?: boolean;
}
const StyledWrap = styled.label<StyledWrapProps>`
  cursor: pointer;
  &:hover {
    background-color: rgba(252, 213, 53, 0.2);
  }
  margin-bottom: 20px;
  border: 1px solid #eeeeee;
  padding: 20px;
  @media only screen and (max-width: 1199px) {
    padding: 10px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
  background-color: ${(props) =>
    props.isSelected ? 'rgba(252, 213, 53, 0.2)' : 'inherit'};
  .label-button {
    font-size: 12px;
    padding: 4px 12px;
    &.default {
      color: #888888;
      background: #eeeeee;
    }
    &.active {
      background: #23a757;
      color: #fff;
    }
  }
`;

interface ShippingAddressProps {
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
  label: string;
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  wardId: string;
  wardName: string;
  onDeleteAddress: (id: string) => void;
  id: string;
  onUpdate: (params: UpdateShippingAddressData) => void;
  type: number;
  isSelected?: boolean;
  onChecked?: (id: string) => void;
}

export interface UpdateShippingAddressData {
  name: string;
  phone: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  type: number;
  isDefault: boolean;
  id: string;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  name,
  phone,
  address,
  isDefault,
  label,
  provinceId,
  provinceName,
  districtId,
  districtName,
  wardId,
  wardName,
  id,
  onDeleteAddress,
  onUpdate,
  type,
  isSelected,
  onChecked,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const handleEdit = () => {
    onUpdate({
      id,
      name,
      phone,
      type,
      provinceId,
      districtId,
      wardId,
      isDefault,
      address,
    });
  };

  return (
    <StyledWrap
      className="item-address justify-content-between d-flex"
      isSelected={isSelected}
      htmlFor={id}
    >
      <div className="d-flex align-items-center">
        {onChecked && (
          <Radio
            type="radio"
            className="mr-3"
            checked={isSelected}
            onChange={() => onChecked(id)}
            id={id}
          />
        )}
        <div>
          <div className="mb-2">
            <span className="text-uppercase">{name} </span>
            <span className="mr-2 ml-2">|</span> {phone}
          </div>
          <div className="mb-3 d-flex align-items-center">
            <span className="text-gray3" style={{ wordBreak: 'break-word' }}>
              {`${address ? `${address},` : ''} ${
                wardName ? `${wardName},` : ''
              } ${districtName ? `${districtName},` : ''} ${
                provinceName ? `${provinceName}` : ''
              }`}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <div className="font-bold cursor-pointer" onClick={handleEdit}>
              <u>{t.edit}</u>
            </div>
            {!isDefault && (
              <div
                className="font-bold cursor-pointer ml-4"
                onClick={() => onDeleteAddress(id)}
              >
                <u>{t.delete}</u>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center flex-shrink-0 ml-2 hide-mobile">
        {isDefault && <TypeLabel label={t.default} />}
        <div className="mlt-2">
          <TypeLabel label={label} name={type === 0 ? 'home' : 'office'} />
        </div>
      </div>
    </StyledWrap>
  );
};

export default ShippingAddress;
