/* eslint-disable react/jsx-no-useless-fragment */
import CartItem from 'components/cart/CartItem';
import { IResponseStoreCart } from 'interfaces/response/cart';
import { ProductItem } from 'interfaces/response/products';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { connect, ConnectedProps } from 'react-redux';
import { setReponseDataCart } from 'redux/action/cart';
import { RootState } from 'redux/reducer';
import { checkedItemCart, checkedItemCartById } from 'services/cart';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const BuyNowPanel: React.FC<PropsFromRedux> = ({
  stores,
  setReponseDataCartAction,
  isLoadingChecked,
  setIsLoadingChecked,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const onCheckedItem = async (e: CheckboxChangeEvent, id: string) => {
    setIsLoadingChecked(true);
    try {
      const data = await checkedItemCartById(id);
      if (data.status) {
        if (data.data.data !== null) {
          setReponseDataCartAction(data.data.data as any);
        } else {
          toast.error(t.itemEmpty);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingChecked(false);
  };

  const handleCheckStore = async (e: CheckboxChangeEvent, id: number) => {
    const itemStore =
      stores
        ?.find((item) => item.storeId === id)
        ?.items.filter((f) => (e.target.checked ? !f.sync : f.sync))
        .map((i) => i.cartId) ?? [];
    console.log(stores);
    try {
      const data = await checkedItemCart(itemStore);
      if (data.status && data.data.data) {
        setReponseDataCartAction(data.data.data as any);
      } else {
        toast.error(t.itemEmpty);
      }
    } catch (error) {
      toast.error(t.itemEmpty);
    }
    setIsLoadingChecked(false);
  };
  return (
    <>
      <div className="d-flex align-items-center w-100 border-cart p-3 hide-mobile">
        <div className="d-flex align-items-center col-lg-5">
          <div className="ml-3">{t.all}</div>
        </div>
        <div className="d-flex align-items-center col-lg-7">
          <div className="col-lg-3">{t.price}</div>
          <div className="col-lg-3">{t.quantity}</div>
          <div className="col-lg-3">{t.toMoney}</div>
          <div className="col-lg-3 text-center">{t.action}</div>
        </div>
      </div>
      {stores?.map((shop) => (
        <div className="mt-4 mb-4 border-cart" key={shop.storeId}>
          <div className="d-flex align-items-center w-100 p-4 border-bottom-gray mb-3">
            <Checkbox
              type="checkbox"
              onChange={(e) => handleCheckStore(e, shop.storeId)}
              checked={shop.items.every((c) => c.sync)}
              disabled={isLoadingChecked}
            />
            <div className="ml-3 font-bold">{shop.name}</div>
          </div>
          <div className="px-3 py-3">
            {shop.items.map((storeItem) => (
              <CartItem
                returnCartData={(data: IResponseStoreCart[]) => {
                  setReponseDataCartAction(data);
                }}
                item={storeItem}
                key={storeItem.cartId}
                isChecked={storeItem.sync}
                onChecked={onCheckedItem}
                disabled={isLoadingChecked}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

interface BuyNowPanelProps {
  products?: ProductItem[];
  isLoadingChecked: boolean;
  setIsLoadingChecked: React.Dispatch<React.SetStateAction<boolean>>;
}
const mapStateToProps = (state: RootState, ownProps: BuyNowPanelProps) => ({
  ...ownProps,
  products: state.cart.products,
  stores: state?.cart?.data,
});
const connector = connect(mapStateToProps, {
  setReponseDataCartAction: setReponseDataCart,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BuyNowPanel);
