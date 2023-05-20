import ItemCartRight from 'components/checkout/ItemCartRight';
import Icon from 'components/common/Icon';
import { OrderEntityExpand } from 'interfaces/response/order';
import { ESstatusPurchaseOrder } from 'interfaces/types/order';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useLayoutEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getOrderDetailServices } from 'services/order';
import styled from 'styled-components';
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
  background: #ffffff;
  border: 1px solid #c2c2c2;
  border-radius: 2px;
  .border-bottom {
    border-bottom: 1px solid #eeeeee;
  }
  .image-product {
    border: 1px solid #eeeeee;
    border-radius: 4px;
    margin-right: 10px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
`;

const MyOrderDetailContainer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<OrderEntityExpand | null>(null);

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

  return (
    <StyledWrap className="container">
      <div className="cursor-pointer bread-cum mbt-5">
        <Icon name="prev-sharp" />
        <Link href={`/my-order/${orderData?.orderId}`}>
          <a className="body-01 hover-color">Quay lại</a>
        </Link>
      </div>
      <div className="headline-01 mbt-2 text-uppercase">{t.followOrder}</div>
      <div className="flex-column-mobile align-items-end margin-bottom-40">
        <div className="headline-04">
          <span className="mrt-2">{renderStatus(orderData?.status)}</span>|
          <span className="mlt-2 mrt-2">
            {t.orderCode}: #{orderData?.code}
          </span>
          |
          <span className="mlt-2">
            {t.orderDate}: {formatDate(orderData?.createdDate)}
          </span>
        </div>
      </div>
      <div className="flex-column-mobile">
        <div className="w-50-responsive margin-bottom-mobile">
          <StyledBox className="mb-4">
            <div className="p-4">
              {loading ? (
                <SkeletonTheme baseColor="#ffffff">
                  <p>
                    <Skeleton count={1} height={30} />
                  </p>
                  <p>
                    <Skeleton count={1} height={30} />
                  </p>
                </SkeletonTheme>
              ) : (
                <>
                  {' '}
                  {orderData?.followStatus.length === 0 ? (
                    <div>Đơn hàng đang chờ xác nhận.</div>
                  ) : (
                    orderData?.followStatus.map((item, index) => (
                      <div className="d-flex">
                        <div>
                          <Icon
                            name={
                              index === 0 ? 'time-line' : 'time-line-disabled'
                            }
                          />
                        </div>

                        <div className="mt-2">
                          <div>
                            <div>
                              <b>{item.descriptions}</b>
                            </div>
                            <div className="text-gray2 font-size12 mt-2">
                              {item.createdDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </StyledBox>
        </div>
        <div className="w-50-responsive">
          <div className="headline-01 mbt-4">{t.headerOrder}</div>
          <div>
            {loading ? (
              <SkeletonTheme baseColor="#ffffff">
                <p>
                  <Skeleton count={1} height={50} />
                </p>
              </SkeletonTheme>
            ) : (
              <>
                {' '}
                {orderData?.products.map((i) => (
                  <ItemCartRight
                    price={i.price}
                    name={i.name}
                    qty={i.qty}
                    image={i.image}
                    key={i.productId}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </StyledWrap>
  );
};

export default MyOrderDetailContainer;
