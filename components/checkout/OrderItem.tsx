/* eslint-disable jsx-a11y/img-redundant-alt */
import Icon from 'components/common/Icon';
import { Product } from 'interfaces/response/order';
import { ESstatusPurchaseOrder } from 'interfaces/types/order';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { formatVietnamDong } from 'utils';

interface StyledStatusProps {
  type: string;
}

export const StyledStatus = styled.div<StyledStatusProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  font-size: 12px;
  color: ${(props) =>
    props.type === 'success'
      ? '#23A757'
      : props.type === 'error'
      ? '#FE3A30'
      : '#2972FE'};
  background-color: ${(props) =>
    props.type === 'success'
      ? 'rgba(35, 167, 87, 0.1)'
      : props.type === 'error'
      ? 'rgba(254, 58, 48, 0.1)'
      : 'rgba(41, 114, 254, 0.1)'};
  border-radius: 26px;
`;

interface OrderItemProps {
  statusOrder: number;
  total: number;
  orderId: number;
  statusPayment: number;
  products: Product[];
}

export const renderIcon = (type?: ESstatusPurchaseOrder) => {
  switch (type) {
    case ESstatusPurchaseOrder.Cancel:
      return 'order-cancel';

    case ESstatusPurchaseOrder.Pending:
      return 'order-pending';

    case ESstatusPurchaseOrder.PendingPickup:
      return 'order-shipping';

    case ESstatusPurchaseOrder.Shipped:
      return 'order-success';

    case ESstatusPurchaseOrder.ShippingProgress:
      return 'order-shipping';

    default:
      return 'order-shipping';
  }
};

const OrderItem: React.FC<OrderItemProps> = ({
  statusOrder,
  total,
  orderId,
  statusPayment,
  products,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const renderStatus = (type?: ESstatusPurchaseOrder) => {
    switch (type) {
      case ESstatusPurchaseOrder.Cancel:
        return t.statusCancel;

      case ESstatusPurchaseOrder.Pending:
        return t.statusPending;

      case ESstatusPurchaseOrder.PendingPickup:
        return t.statusPendingPickup;

      case ESstatusPurchaseOrder.Shipped:
        return t.statusShipped;

      case ESstatusPurchaseOrder.ShippingProgress:
        return t.statusShippingProgress;

      default:
        return t.statusPending;
    }
  };
  return (
    <div className="purchase-history">
      <div className="d-flex align-items-center py-3 border-bottom-gray justify-content-between">
        <div className="d-flex align-items-center">
          <Icon name={renderIcon(statusOrder)} />
          <span className="text-uppercase ml-2 headline-03 mt-1">
            {renderStatus(statusOrder)}
          </span>
        </div>
        <div className="d-flex align-items-center">
          {/* <button className="button button-primary py-3 px-4" type="button">
            Đặt lại
          </button> */}
          <button
            className="button button-primary size-s px-4 ml-3"
            type="button"
            onClick={() => router.push(`/my-order/${orderId}`)}
          >
            {t.viewDetailOrder}
          </button>
        </div>
      </div>
      <div className="pb-2 border-bottom-gray">
        {(products ?? []).map((item) => (
          <div className="d-flex align-items-center py-2">
            <div className="col-lg-2">
              <div className="image-item">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxHeight: '120px' }}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div style={{ wordBreak: 'break-word' }} className="headline-03">
                {item.name}
              </div>
            </div>
            <div className="col-lg-2 hide-mobile botton-label">
              {formatVietnamDong(item.price)}
            </div>
            <div className="col-lg-2 hide-mobile botton-label">x{item.qty}</div>
            <div className="col-lg-2 botton-label">
              {formatVietnamDong(item.total)}
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end mt-3 font-size16">
        {t.total}: &nbsp;
        <span className="botton-label">{formatVietnamDong(total)}</span>
      </div>
    </div>
  );
};

export default OrderItem;
