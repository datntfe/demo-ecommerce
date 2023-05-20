import TypeLabel from 'components/address/TypeLabel/TypeLabel';
import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

interface StyledWrapProps {
  isSelected?: boolean;
}
const StyledWrap = styled.div<StyledWrapProps>`
  width: calc((100% - 20px) / 2);
  margin-bottom: 20px;
  border: 1px solid #858585;
  padding: 20px;
  border-radius: 8px;

  &:nth-child(2n + 1) {
    margin-right: 20px;
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
  @media only screen and (max-width: 1199px) {
    width: 100%;
    &:nth-child(2n + 1) {
      margin-right: 0px;
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
    >
      <div className="d-flex flex-column justify-content-between">
        <div>
          <div className="mbt-3">
            <span className="text-uppercase">{name} </span>
            <span className="mr-2 ml-2">|</span> {phone}
          </div>
          <div className="mbt-5 d-flex align-items-center">
            <span className="text-gray3" style={{ wordBreak: 'break-word' }}>
              {`${address ? `${address},` : ''} ${
                wardName ? `${wardName},` : ''
              } ${districtName ? `${districtName},` : ''} ${
                provinceName ? `${provinceName}` : ''
              }`}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div
              className="underline-14 cursor-pointer text-blue"
              onClick={handleEdit}
            >
              <u>{t.edit}</u>
            </div>
            {!isDefault && (
              <div
                className="underline-14 cursor-pointer ml-4 text-blue"
                onClick={() => onDeleteAddress(id)}
              >
                <u>{t.delete}</u>
              </div>
            )}
          </div>

          <div className="d-flex align-items-center flex-shrink-0 ml-2">
            {isDefault && <TypeLabel label={t.default} />}
            <div className="mlt-2">
              <TypeLabel label={label} name={type === 0 ? 'home' : 'office'} />
            </div>
          </div>
        </div>
      </div>
    </StyledWrap>
  );
};

export default ShippingAddress;
