import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { TCartPaymentMethodProps } from './CartPaymentMethod.types';

const CartPaymentMethod: React.FC<TCartPaymentMethodProps> = ({
  checked,
  title,
  description,
  suffix,
  noShowLabel,
  expand,
  onClick,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpen = (): void => {
    setVisible(true);
  };

  const handleClose = (): void => {
    setVisible(false);
  };

  useEffect(() => {
    setVisible(Boolean(checked));
  }, [checked]);
  return (
    <div
      className={classNames('CartPaymentMethod', {
        active: checked,
      })}
    >
      <div
        className="CartPaymentMethod-wrapper d-flex align-items-center"
        onClick={onClick}
      >
        <div className="CartPaymentMethod-check" />
        <div className="CartPaymentMethod-info">
          <div className="CartPaymentMethod-info-title">{title}</div>
          <div className="CartPaymentMethod-info-description">
            {description}
          </div>
        </div>
        {suffix && (
          <div className="CartPaymentMethod-value d-flex align-items-center">
            <div className="CartPaymentMethod-value-icon">
              <img src={suffix?.image} alt="" />
            </div>
            {!noShowLabel && suffix?.title && (
              <div className="CartPaymentMethod-value-text">
                {suffix?.title}
              </div>
            )}
            <div
              className="CartPaymentMethod-value-text change"
              onClick={handleOpen}
            >
              Thay đổi
            </div>
          </div>
        )}
      </div>

      {expand && visible && (
        <div className="CartPaymentMethod-children">
          {expand({ onClose: handleClose })}
        </div>
      )}
    </div>
  );
};

export default CartPaymentMethod;
