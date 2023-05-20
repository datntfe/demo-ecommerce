/* eslint-disable react/jsx-no-useless-fragment */
import CartTab from 'components/cart/CartTab';
import Icon from 'components/common/Icon';
import { ProductItem } from 'interfaces/response/products';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import {
  setReponseDataBiddingCart,
  setReponseDataCart,
} from 'redux/action/cart';
import { getShippingAddress } from 'redux/action/user';
import { RootState } from 'redux/reducer';
import { getCartBiddingItems, getCartItems } from 'services/cart';
import { formatVietnamDong } from 'utils';
import { useMediaQuery } from 'react-responsive';
import BuyNowPanel from './components/BuyNowPanel';
import DepositPanel from './components/DepositPanel';

const CartContainer: React.FC<PropsFromRedux> = ({
  carts,
  cartsBidding,
  setReponseDataCartAction,
  setReponseDataBiddingCartAction,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const [total, setTotal] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const user = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();
  const [isLoadingChecked, setIsLoadingChecked] = useState(false);
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    let total = 0;
    let totalWeight = 0;
    if (isBuyNow) {
      carts?.map((store) => {
        store.items
          .filter((f) => f.sync)
          .map((item) => {
            total += item.total;
            totalWeight += item.weight * item.qty;
            return null;
          });
        return store;
      });
    } else {
      cartsBidding?.map((store) => {
        store.items
          .filter((f) => f.sync)
          .map((item) => {
            total += item.total;
            totalWeight += item.weight * item.qty;
            return null;
          });
        return store;
      });
    }
    setTotal(total);
    setTotalWeight(totalWeight);
  }, [carts, cartsBidding, isBuyNow]);

  useEffect(() => {
    if (!user || !isBuyNow) {
      return;
    }
    setIsLoadingCart(true);
    getCartItems().then((response) => {
      const { data } = response;
      setReponseDataCartAction(data.data as any);
      setIsLoadingCart(false);
    });
  }, [router.pathname, user, isBuyNow]);

  useEffect(() => {
    if (!user || isBuyNow) {
      return;
    }
    setIsLoadingCart(true);
    getCartBiddingItems().then((response) => {
      const { data } = response;
      setReponseDataBiddingCartAction(data.data as any);
      setIsLoadingCart(false);
    });
  }, [router.pathname, user, isBuyNow]);

  const handleCheckout = () => {
    // router.push(`/shipping/?isBuyNow=${isBuyNow ? '1' : '0'}`);
    router.push('/shipping');
  };

  const checkDisabledButton = () => {
    if (isBuyNow) {
      return (
        carts?.every((item) => item.items.every((c) => !c.sync)) ||
        isLoadingChecked
      );
    }

    return (
      cartsBidding?.every((item) => item.items.every((c) => !c.sync)) ||
      isLoadingChecked
    );
  };
  const checkEmptyCart = () => {
    if (isBuyNow) {
      return carts.length === 0;
    }
    return cartsBidding.length === 0;
  };
  // useEffect(() => {
  //   if (router.query.isBuyNow === '0') {
  //     setIsBuyNow(false);
  //   }
  // }, [router.query.isBuyNow]);

  const handleCoupon = async () => {
    setCoupon('');
    setTimeout(() => {
      toast.error('Mã giảm giá không đúng hoặc đã hết hạn!');
    }, 300);
  };

  useEffect(() => {
    if (user?.userId) {
      dispatch(getShippingAddress());
    }
  }, [dispatch, user?.userId]);

  return (
    <div className="cart mt-5">
      <CartTab active={1} />
      <div className="container">
        <div className="title-page headline-01">{t.myCart}</div>
        {/* <div className="filter left mb-5">
          <div
            className={`item ${isBuyNow ? '' : 'active'}`}
            onClick={() => setIsBuyNow(false)}
          >
            {t.bid}
          </div>
          <div
            className={`item ${!isBuyNow ? '' : 'active'}`}
            onClick={() => setIsBuyNow(true)}
          >
            {t.buyNow}
          </div>
        </div> */}

        {!isLoadingCart && checkEmptyCart() ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: '500px' }}
          >
            <Icon name="cart-empty" />
            <div className="font-size20 mt-5 mb-5">
              {t.cart} {isBuyNow ? t.buyNow : t.bid} {t.youCartEmpty}
            </div>
            <button
              type="button"
              className="button button-primary px-5 py-3"
              onClick={() => router.push('/')}
            >
              {t.buyGods}
            </button>
          </div>
        ) : (
          <div className="flex-column-mobile">
            <div className="left">
              <div>
                {isLoadingCart ? (
                  <div className="p-3 mt-3">
                    <SkeletonTheme baseColor="#ffffff">
                      <p>
                        <Skeleton count={1} height={20} borderRadius={2} />
                      </p>
                      <p>
                        <Skeleton count={1} height={88} borderRadius={2} />
                      </p>
                      <p>
                        <Skeleton count={1} height={88} borderRadius={2} />
                      </p>
                    </SkeletonTheme>
                  </div>
                ) : (
                  <>
                    {isBuyNow ? (
                      <BuyNowPanel
                        isLoadingChecked={isLoadingChecked}
                        setIsLoadingChecked={setIsLoadingChecked}
                      />
                    ) : (
                      <DepositPanel
                        isLoadingChecked={isLoadingChecked}
                        setIsLoadingChecked={setIsLoadingChecked}
                      />
                    )}
                  </>
                )}
              </div>
              {isMobile && (
                <div className="d-flex align-items-center w-100 px-3 py-4 justify-content-between">
                  <div className="body-01">{t.total}</div>
                  <div className="heading-04">{formatVietnamDong(total)}</div>
                </div>
              )}
              <div className="d-flex justify-content-end mt-5">
                <button
                  type="button"
                  className="button button-primary size-l w-300"
                  disabled={checkDisabledButton()}
                  onClick={handleCheckout}
                >
                  {t.buyGods}
                </button>
              </div>
            </div>
            <div className="right">
              {/* <div className="mb-4 text-uppercase title-page mt-0">Tóm tắt đơn hàng</div> */}
              {/* <div className="coupond mb-3">
                <div>
                  <Icon name="coupon" />
                </div>
                <input placeholder="Nhập mã khuyến mãi" onChange={(e) => setCoupon(e.target.value)} value={coupon} />
                <button
                  type="button"
                  className="button button-primary px-5 py-4 flex-shrink-0"
                  disabled={coupon === ''}
                  onClick={handleCoupon}
                >
                  Áp dụng
                </button>
              </div>
              <div className="d-flex align-items-center w-100 px-3 py-3 justify-content-between">
                <div>Tạm tính</div>
                <div>
                  <b>{formatVietnamDong(total)}</b>
                </div>
              </div>
              <div className="d-flex align-items-center w-100 px-3 py-3 border-bottom-gray justify-content-between">
                <div>Mã khuyến mãi</div>
                <div>
                  <b>{formatVietnamDong(0)}</b>
                </div>
              </div> */}
              {!isMobile && (
                <div className="d-flex align-items-center w-100 px-3 py-2 justify-content-between">
                  <div className="body-01">{t.total}</div>
                  <div className="heading-04">{formatVietnamDong(total)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// export default CartContainer;

interface CartContainerProps {
  products?: ProductItem[];
}
const mapStateToProps = (state: RootState, ownProps: CartContainerProps) => ({
  ...ownProps,
  products: state.cart.products,
  carts: state?.cart?.data,
  cartsBidding: state?.cart?.dataBidding,
});
const connector = connect(mapStateToProps, {
  setReponseDataCartAction: setReponseDataCart,
  setReponseDataBiddingCartAction: setReponseDataBiddingCart,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CartContainer);
