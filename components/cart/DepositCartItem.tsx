/* eslint-disable jsx-a11y/img-redundant-alt */
import { IResponseItemBiddingCart } from 'interfaces/response/cart';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { formatVietnamDong } from 'utils';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';

const Completionist = () => <span>Ended!</span>;
interface rendererProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }: rendererProps) => {
  if (completed) {
    return <Completionist />;
  }
  return (
    <span>
      {hours <= 9 ? `0${hours}` : hours}:
      {minutes <= 9 ? `0${minutes}` : minutes}:
      {seconds <= 9 ? `0${seconds}` : seconds}
    </span>
  );
};

interface DepositCartItemProps {
  image?: string;
  attribute?: string;
  discountPrice?: number;
  item: IResponseItemBiddingCart;
  // returnCartData: any;
  isChecked: boolean;
  onChecked: (e: CheckboxChangeEvent, id: string) => void;
  disabled: boolean;
}

const DepositCartItem: React.FC<DepositCartItemProps> = ({
  attribute,
  discountPrice,
  item,
  // returnCartData,
  isChecked,
  onChecked,
  disabled,
}) => {
  const [quantity, setQuantity] = useState(item.qty);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    setQuantity(item.qty);
  }, [item.qty]);

  return (
    <div
      style={{ pointerEvents: !isBusy ? 'unset' : 'none' }}
      className="d-flex align-items-center w-100 py-3 cart-item"
    >
      <div className="d-flex align-items-center col-lg-6">
        <Checkbox
          type="checkbox"
          checked={isChecked}
          onChange={(e: CheckboxChangeEvent) => onChecked(e, item.cartId)}
          disabled={disabled}
        />
        <div className="ml-3 d-flex align-items-center">
          <div className="image">
            <img src={item.image} alt="image" />
          </div>
          <div>
            <div className="title">
              <Link href={`/products/${item.sku}`}>
                <a className="headline-03 text-gray6 hover-color">
                  {item.name}
                </a>
              </Link>
            </div>
            <div className="atribute">{attribute}</div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center col-lg-6">
        <div className="col-lg-6">
          <div
            className="headline-04 text-through"
            style={{ color: '#A3A3A3' }}
          >
            {formatVietnamDong(item.originalPrice)}
          </div>
          <div className="botton-label">{formatVietnamDong(item.total)}</div>
        </div>
        <div className="col-lg-6 text-blue">
          <Countdown date={item.expiredTime} renderer={renderer} />
        </div>
      </div>
    </div>
  );
};

export default DepositCartItem;
