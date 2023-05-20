/* eslint-disable react/jsx-no-useless-fragment */
import DepositCartItem from 'components/cart/DepositCartItem';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { connect, ConnectedProps } from 'react-redux';
import { setReponseDataBiddingCart } from 'redux/action/cart';
import { RootState } from 'redux/reducer';
import {
  checkedItemBiddingCart,
  checkedItemBiddingCartById,
} from 'services/cart';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';

const DepositPanel: React.FC<PropsFromRedux> = ({
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
      const data = await checkedItemBiddingCartById(id);
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
    let itemStore: string[] = [];
    if (e.target.checked) {
      itemStore =
        stores
          ?.find((item) => item.storeId === id)
          ?.items.filter((f) => !f.sync)
          .map((i) => i.cartId) ?? [];
    } else {
      itemStore =
        stores
          ?.find((item) => item.storeId === id)
          ?.items.filter((f) => f.sync)
          .map((i) => i.cartId) ?? [];
    }
    try {
      const data = await checkedItemBiddingCart(itemStore);
      if (data.status && data.data.data) {
        setReponseDataCartAction(data.data.data as any);
      } else {
        toast.error(t.itemEmpty);
      }
    } catch (error) {
      console.log(error);
      toast.error(t.itemEmpty);
    }
    setIsLoadingChecked(false);
  };

  return (
    <>
      <div className="d-flex align-items-center w-100 border-cart p-3 hide-mobile">
        <div className="d-flex align-items-center col-lg-6">
          <div className="ml-3 headline-04">{t.all}</div>
        </div>
        <div className="d-flex align-items-center col-lg-6">
          <div className="col-lg-6 headline-04">{t.hiddenPrice}</div>
          <div className="col-lg-6 headline-04">{t.duration}</div>
          {/* <div className="col-lg-3 text-center">Thao tác</div> */}
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
            {/* <div className="ml-3 font-bold">{shop.name}</div> */}
          </div>
          <div className="px-3 py-3">
            {shop.items
              .filter((f) => f.expiredTime > new Date().getTime())
              .map((storeItem) => (
                <DepositCartItem
                  // returnCartData={(data: IResponseStoreCart[]) => {
                  //   setReponseDataCartAction(data);
                  // }}
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

interface DepositPanelProps {
  isLoadingChecked: boolean;
  setIsLoadingChecked: React.Dispatch<React.SetStateAction<boolean>>;
}
const mapStateToProps = (state: RootState, ownProps: DepositPanelProps) => ({
  ...ownProps,
  stores: state?.cart?.dataBidding,
});
const connector = connect(mapStateToProps, {
  setReponseDataCartAction: setReponseDataBiddingCart,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(DepositPanel);
