/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from 'components/common/Icon';
import { formatVietnamDong } from 'utils';
import CCounterInput from 'components/common/counterInput';
import {
  IResponseItemCart,
  IResponseStoreCart,
} from 'interfaces/response/cart';
import { putCartItems, removeCartItem } from 'services/cart';
import { message, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { removeItemCartBuyNow } from 'redux/action/user';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';
import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface CartItemProps {
  image?: string;
  attribute?: string;
  discountPrice?: number;
  price?: number;
  item: IResponseItemCart;
  returnCartData: any;
  isChecked: boolean;
  onChecked: (e: CheckboxChangeEvent, id: string) => void;
  disabled: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  attribute,
  discountPrice,
  item,
  returnCartData,
  isChecked,
  onChecked,
  disabled,
}) => {
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [quantity, setQuantity] = useState(item.qty);
  const [isBusy, setIsBusy] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  useEffect(() => {
    setQuantity(item.qty);
  }, [item.qty]);

  const handleChangeQty = async (count: number) => {
    setIsBusy(true);
    try {
      const response = await putCartItems(
        item.cartId,
        item.productId,
        item.sku,
        count,
      );
      if (!response.data.status && count > quantity) {
        message.error(response.data.message);
        setQuantity(quantity);
        setIsBusy(false);
        return;
      }
      setIsBusy(false);
      message.success('Cập nhật giỏ hàng thành công!');
      returnCartData(response.data.data);
    } catch (error) {
      console.log(error);
      setIsBusy(false);
    }
  };

  return (
    <div
      style={{ pointerEvents: !isBusy ? 'unset' : 'none' }}
      className="d-flex align-items-center w-100 py-3 cart-item"
    >
      {confirmDeletePopup && (
        <ConfirmPopup
          onCancel={() => setConfirmDeletePopup(false)}
          onConfirm={async () => {
            setConfirmDeletePopup(false);
            setIsBusy(true);
            const response = await removeCartItem(item.cartId);
            if (!response.data.status) {
              message.error(response.data.message);
              return;
            }
            setIsBusy(false);
            message.success(t.deleteCart);
            returnCartData(response.data.data);
            dispatch(removeItemCartBuyNow());
          }}
          title=""
        >
          {' '}
          <div className="text-center mb-3">
            <img src="/svg/trash.svg" alt="trash" />
          </div>
          <div className="text-center font-size20">{t.confirmDelete}</div>
          <div className="text-center mt-2">{t.deleteItemCart}</div>
        </ConfirmPopup>
      )}

      <div className="d-flex align-items-center col-md-2">
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
        </div>
      </div>
      <div className="d-flex col-md-10 align-items-center">
        <div className="col-lg-4">
          <div className="title">
            <Link href={`/products/${item.sku}`}>
              <a>{item.name}</a>
            </Link>
          </div>
          <div className="atribute">{attribute}</div>
        </div>
        <div className="d-flex align-items-center col-lg-8">
          <div className="hide-mobile col-lg-3">
            <div className="price">{formatVietnamDong(item.price)}</div>
          </div>
          <div className="col-lg-3">
            <CCounterInput
              isLoading={isBusy}
              min={1}
              max={100}
              callback={handleChangeQty}
              count={quantity}
            />
          </div>
          <div className="money col-lg-3">{formatVietnamDong(item.total)}</div>
          <div className="text-center col-lg-3">
            <button type="button" onClick={() => setConfirmDeletePopup(true)}>
              <Icon name="trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
