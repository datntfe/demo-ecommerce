import React from 'react';
import classNames from 'classnames';

import Icon, { EIconName } from 'components/Icon';

import Button from 'components/Button';
import { EAddressCardType } from './AddressCard.enums';
import { TAddressCardProps } from './AddressCard.types';

const AddressCard: React.FC<TAddressCardProps> = ({
  type = EAddressCardType.VERTICAL,
  headerTitle,
  name,
  phoneNumber,
  address,
  email,
  home,
  office,
  defaultAddress,
  preview,
  radius,
  headerIcon,
  onEdit,
  onDelete,
  suffixSubButtonProps,
  suffixButtonProps,
  children,
}) => {
  const renderBadgesAddress = (): React.ReactNode => (
    <div className="AddressCard-badges d-flex">
      {defaultAddress && (
        <div className="AddressCard-badge d-flex align-items-center">
          Mặc định
        </div>
      )}
      {home && (
        <div className="AddressCard-badge d-flex align-items-center">
          <Icon name={EIconName.HomeShopdi} />
          Nhà riêng
        </div>
      )}
      {office && (
        <div className="AddressCard-badge d-flex align-items-center">
          <Icon name={EIconName.BriefcaseShopdi} />
          Văn phòng
        </div>
      )}
    </div>
  );

  return (
    <div className={classNames('AddressCard', type, { radius })}>
      {headerTitle && (
        <div className="AddressCard-header d-flex align-items-center justify-content-between">
          <h5 className="AddressCard-header-title d-flex align-items-center">
            {headerIcon && (
              <div className="AddressCard-header-icon">{headerIcon}</div>
            )}
            {headerTitle}
          </h5>
          <div className="AddressCard-header-btns d-flex">
            {suffixSubButtonProps && (
              <Button primary size="large" {...suffixSubButtonProps} />
            )}
            {suffixButtonProps && (
              <Button primary size="large" {...suffixButtonProps} />
            )}
          </div>
        </div>
      )}

      {children ? (
        <div className="AddressCard-body">{children}</div>
      ) : (
        <div className="AddressCard-body">
          <div className="AddressCard-text d-flex align-items-center justify-content-between flex-wrap">
            <p className="AddressCard-text d-flex align-items-center mb-0">
              {name}{' '}
              {phoneNumber && (
                <>
                  <span /> {phoneNumber}
                </>
              )}
            </p>

            {type === EAddressCardType.HORIZONTAL && renderBadgesAddress()}
          </div>
          <p className="AddressCard-text">{address}</p>
          <p className="AddressCard-text mb-0">{email}</p>

          {!preview && (
            <div className="AddressCard-actions d-flex align-items-center justify-content-between">
              <div className="AddressCard-actions-col d-flex align-center">
                <div className="AddressCard-actions-item" onClick={onEdit}>
                  Chỉnh sửa
                </div>
                <div
                  className="AddressCard-actions-item delete"
                  onClick={onDelete}
                >
                  Xoá
                </div>
              </div>

              <div className="AddressCard-actions-col">
                {type === EAddressCardType.VERTICAL && renderBadgesAddress()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressCard;
