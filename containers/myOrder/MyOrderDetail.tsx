import AlertPopup from 'components/common/AlertPopup';
import Icon from 'components/common/Icon';
import CancelOrderPopup from 'components/purchase/CancelOrder';
import { OrderEntityExpand } from 'interfaces/response/order';
import { ESstatusPurchaseOrder } from 'interfaces/types/order';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  cancelOrder,
  getOrderDetailServices,
  returnPlaceOrder,
} from 'services/order';
import styled from 'styled-components';
import theme from 'styles/theme/index';
import { formatVietnamDong } from 'utils';
import { formatDate } from 'utils/convertDate';

const StyledWrap = styled.div`
  margin-bottom: 50px;
  .bread-cum {
    margin-top: 40px;
  }
  .margin-bottom-40 {
    margin-bottom: 40px;
  }
`;
const StyledBox = styled.div`
  @media only screen and (max-width: 1199px) {
    width: 100%;
    margin-bottom: 10px;
  }
  .border-title {
    border-bottom: 0.5px solid #c2c2c2;
  }
  width: calc((100% - 40px) / 3);
  background: #ffffff;
  border: 1px solid #c2c2c2;
  border-radius: 2px;
  padding: 0px 15px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;
const StyledCart = styled.div`
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #c2c2c2;
  margin-bottom: 20px;
  padding: 0px 15px;
  &:last-child {
    margin-bottom: 0;
  }
  .image {
    border: 1px solid #eeeeee;
    border-radius: 4px;
    margin-right: 10px;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    img {
      max-height: 120px;
    }
  }
  .atribute {
    color: ${theme.text_gray3};
    font-size: 12px;
    margin-top: 5px;
  }
  .discount-price {
    font-size: 11px;
    color: ${theme.text_gray3};
  }
  .price {
    font-size: 13px;
  }
  .money {
    font-size: 13px;
    color: ${theme.orange};
  }

  .button-small {
    font-size: 12px;
    color: #2972fe;
    padding: 3px 5px;
    border-radius: 4px;
    border: 1px solid #2972fe;
  }
`;

export const renderStatusPayment = (statusPayment: number) => {
  if (statusPayment === 0) {
    return 'Chờ thanh toán';
  }
  if (statusPayment === 1) {
    return 'Thanh toán thành công';
  }
  if (statusPayment === 2) {
    return 'Thanh toán thất bại';
  }
};

const MyOrderDetailContainer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [orderData, setOrderData] = useState<OrderEntityExpand | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpenCancelPopup, setIsOpenCancelPopup] = useState(false);
  const [isOpenCancelSuccess, setIsOpenCancelSuccess] = useState(false);
  const [loadingCancelOrder, setLoadingCancelOrder] = useState(false);

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

  useLayoutEffect(() => {
    if (router.query.orderId === undefined) {
      return;
    }
    const main = async () => {
      try {
        setLoading(true);
        const data = await getOrderDetailServices(String(router.query.orderId));
        if (data.data.status) {
          setOrderData(data.data.data);
        } else {
          router.push('/404');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        router.push('/404');
      }
    };
    main();
  }, [router.query.orderId]);

  const handleCancelOrder = async (params: {
    reasonId: string;
    reason: string;
  }) => {
    try {
      setLoadingCancelOrder(true);
      const data = await cancelOrder({
        id: orderData?.orderId ?? 0,
        reason: params.reason,
      });
      if (data.data.status) {
        setLoadingCancelOrder(false);
        setIsOpenCancelSuccess(true);
      } else {
        toast.error(data.data.message);
        setLoadingCancelOrder(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingCancelOrder(false);
    }
  };

  const handleReturnPlaceOrder = async () => {
    try {
      setLoadingCancelOrder(true);
      const data = await returnPlaceOrder(orderData?.orderId ?? 0);
      setLoadingCancelOrder(false);
    } catch (error) {
      console.log(error);
      setLoadingCancelOrder(false);
    }
  };

  console.log(orderData);

  return (
    <StyledWrap className="container">
      {isOpenCancelPopup && (
        <CancelOrderPopup
          orderId={orderData?.code ?? 0}
          onCancel={() => setIsOpenCancelPopup(false)}
          onConfirm={handleCancelOrder}
          isLoading={loadingCancelOrder}
        />
      )}
      {isOpenCancelSuccess && (
        <AlertPopup
          button="Tiếp tục mua sắm"
          content={
            <>
              <div className="text-center font-bold">{t.youOrderCancel}</div>
              <div className="mt-2">{t.shopdiService}</div>
            </>
          }
          onConfirm={() => {
            router.replace('/');
          }}
          iconName="cancel-success-order"
        />
      )}
      <div className="cursor-pointer bread-cum mbt-5">
        <Icon name="prev-sharp" />
        <Link href="/user/purchase/">
          <a className="body-01 hover-color">Quay lại</a>
        </Link>
      </div>
      <div className="headline-01 mbt-2">{t.myOrder}</div>
      <div className="flex-column-mobile justify-content-between margin-bottom-40">
        <div className="headline-04 d-flex align-items-end margin-bottom-mobile">
          <span className="mrt-2">{renderStatus(orderData?.status)}</span>|
          <span className="mlt-2 mrt-2">
            {t.orderCode}: #{orderData?.code}
          </span>
          |
          <span className="mlt-2">
            {t.orderDate}: {formatDate(orderData?.createdDate)}
          </span>
        </div>
        <div className="d-flex  align-items-center">
          {orderData?.status !== ESstatusPurchaseOrder.Pending && (
            <button
              type="button"
              onClick={() =>
                router.push(`/my-order/tracking/${orderData?.orderId}`)
              }
              style={{ padding: '7px 10px' }}
              className="button button-outline py-3 px-5"
            >
              {t.followOrder}
            </button>
          )}

          {/* {(orderData?.status === ESstatusPurchaseOrder.Cancel ||
            orderData?.status === ESstatusPurchaseOrder.Shipped) && (
            <div className="ml-3">
              <button
                type="button"
                onClick={handleReturnPlaceOrder}
                className="button button-outline py-3 px-5"
              >
                Đặt lại
              </button>
            </div>
          )} */}

          {(orderData?.status === ESstatusPurchaseOrder.Pending ||
            orderData?.status === ESstatusPurchaseOrder.PendingPickup ||
            orderData?.status === ESstatusPurchaseOrder.ShippingProgress) && (
            <div className="ml-3">
              <button
                type="button"
                onClick={() => setIsOpenCancelPopup(true)}
                className="button button-primary py-3 px-5"
              >
                {t.cancelOrder}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-column-mobile">
        <StyledBox>
          <div className="d-flex align-items-center w-100 py-4 border-title headline-03 text-uppercase">
            {t.buyerAddress}
          </div>
          <div className="py-4">
            {loading ? (
              <SkeletonTheme baseColor="#ffffff">
                <p>
                  <Skeleton count={1} height={55} />
                </p>
              </SkeletonTheme>
            ) : (
              <>
                <div className="mb-3 headline-3">
                  <span className="mrt-4">{orderData?.address.name}</span>|
                  <span className="mlt-4">{orderData?.address.phone}</span>
                </div>
                <div className="headline-3">
                  {`${orderData?.address.address}${
                    orderData?.address.districtName
                      ? `${orderData?.address.districtName},`
                      : ','
                  } ${
                    orderData?.address.provinceName
                      ? `${orderData?.address.provinceName}`
                      : ''
                  }`}
                </div>
              </>
            )}
          </div>
        </StyledBox>

        <StyledBox>
          <div className="d-flex align-items-center w-100 p-4  border-title headline-03 text-uppercase">
            {t.shippingType}
          </div>
          <div className="p-4">
            {loading ? (
              <SkeletonTheme baseColor="#ffffff">
                <p>
                  <Skeleton count={1} height={55} />
                </p>
              </SkeletonTheme>
            ) : (
              <>
                <div className="mb-3 headline-3">
                  <span className="mrt-4">{t.express}</span>|
                  <span className="mlt-4">
                    {formatVietnamDong(orderData?.shippingFee ?? 0)}
                  </span>
                </div>
                <div className="text-gray2">
                  {t.shippedAt} {orderData?.shippingDateTo}
                </div>
                <div className="text-gray2">{t.shippedBy} SupperShip</div>
              </>
            )}
          </div>
        </StyledBox>

        <StyledBox>
          <div className="d-flex align-items-center w-100 p-4  border-title headline-03 text-uppercase">
            {t.footerPaymentGate}
          </div>
          <div className="p-4">
            {loading ? (
              <SkeletonTheme baseColor="#ffffff">
                <p>
                  <Skeleton count={1} height={55} />
                </p>
              </SkeletonTheme>
            ) : (
              <>
                {' '}
                <div className="mb-3 headline-3">
                  {t.checkoutBy}: {orderData?.payment_method}
                </div>
                {orderData?.payment_method !== 'Thanh toán khi nhận hàng' && (
                  <div className="headline-3">
                    {t.status}:{' '}
                    <span>
                      {renderStatusPayment(orderData?.statusPayment ?? 0)}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </StyledBox>
      </div>
      <StyledCart className="py-3 mt-5">
        <div className="d-flex align-items-center w-100 py-4 border-bottom">
          <div className="d-flex align-items-center col-lg-5">
            <div>
              {t.all} {orderData?.products.length} {t.item}
            </div>
          </div>
          <div className="d-flex align-items-center col-lg-7" />
        </div>
        {loading ? (
          <SkeletonTheme baseColor="#ffffff">
            <p>
              <Skeleton count={1} height={50} />
            </p>
            <p>
              <Skeleton count={1} height={50} />
            </p>
          </SkeletonTheme>
        ) : (
          <>
            {' '}
            {orderData?.products.map((item) => (
              <div className="d-flex align-items-center border-bottom py-3">
                <div className="d-flex align-items-center col-lg-5">
                  <div className="ml-3 d-flex align-items-center">
                    <div className="image">
                      <img src={item?.image} alt="image" />
                    </div>
                    <div>
                      <div className="headline-03">
                        <Link href={`/products/${item.sku}`}>
                          <a className="text-gray6">{item?.name}</a>
                        </Link>
                      </div>
                      {/* <div className="atribute">Sierra blue</div> */}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center col-lg-7">
                  <div className="col-lg-4">
                    {/* <div className="discount-price">
                <s>{formatVietnamDong(200000)}</s>
              </div> */}
                    <div className="botton-label hide-mobile text-right">
                      {formatVietnamDong(item?.price)}
                    </div>
                  </div>
                  <div className="col-lg-4 botton-label text-right">
                    x{item?.qty}
                  </div>
                  <div className="col-lg-4 botton-label text-right">
                    {formatVietnamDong(item?.total)}
                  </div>
                  {/* <div className="col-lg-4 text-right botton-label"> 
                     <div className="d-flex align-items-center justify-content-end">
                  <button className="button-small" type="button">
                    Viết nhận xét
                  </button>
                  <div className="ml-3">
                    <button className="button-small" type="button">
                      Liên hệ
                    </button>
                  </div>
                </div> 
                  {/* </div> */}
                </div>
              </div>
            ))}
          </>
        )}

        <div className="p-4">
          <div className="d-flex justify-content-between mbt-5">
            <div className="text-left">{t.preSum}</div>
            <div className="text-right botton-label">
              {formatVietnamDong(
                (orderData?.total ?? 0) - (orderData?.shippingFee ?? 0),
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between mbt-5">
            <div className="text-left">{t.shippingFee}</div>
            <div className="text-right botton-label">
              {formatVietnamDong(orderData?.shippingFee ?? 0)}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-left">{t.toMoney}</div>
            <div className="text-right">
              <div className="font-size20 mb-2 text-red">
                <b>{formatVietnamDong(orderData?.total ?? 0)}</b>
              </div>
              <div className="body-04 text-gray5">({t.includesVat})</div>
            </div>
          </div>
        </div>
      </StyledCart>
    </StyledWrap>
  );
};

export default MyOrderDetailContainer;
