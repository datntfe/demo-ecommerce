import OrderItem from 'components/checkout/OrderItem';
import Icon from 'components/common/Icon';
import LeftSide from 'components/users/LeftSide';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from 'redux/action/order';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';
import Link from 'next/link';
import FilterTab from 'components/common/FilterTab';

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 25px;
    .title {
      font-size: 20px;
      border-bottom: 1px solid #c2c2c2;
      padding: 10px 0;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
    }
  }

  .bg-gray4 {
    background: #eeeeee;
    border-radius: 8px;
  }
`;
const activeMenu = '3';
const PAGE_SIZE = 15;

const Purchase = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const [onFilter, setOnFilter] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const orderList = useSelector((state: RootState) => state.order.history);
  const isLoadingHistory = useSelector(
    (state: RootState) => state.order.isLoadings.getHistory,
  );

  const FILTER_ITEM = [
    { title: t.all, id: 0 },
    { title: t.pendingCheckout, id: 1 },
    { title: t.inprogress, id: 2 },
    { title: t.statusShippingProgressLow, id: 3 },
    { title: t.shipped, id: 4 },
    { title: t.cancel, id: 5 },
  ];

  useEffect(() => {
    if (
      !isLoadingHistory &&
      orderList.pageIndex < orderList.totalPaging &&
      pageIndex === orderList.pageIndex &&
      orderList.data.length > 0 &&
      loadMore
    ) {
      setPageIndex(pageIndex + 1);
      setLoadMore(false);
      dispatch(
        getOrderHistory(
          { status: onFilter, pageSize: PAGE_SIZE, pageIndex: pageIndex + 1 },
          true,
        ),
      );
    } else {
      setLoadMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore]);

  const scrollFunc = () => {
    const currentScrollY = window.scrollY;
    if (
      window.innerHeight + currentScrollY >=
      document.body.offsetHeight - 400
    ) {
      setLoadMore(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollFunc);
    return () => window.removeEventListener('scroll', scrollFunc);
  }, []);

  useEffect(() => {
    dispatch(
      getOrderHistory({ status: onFilter, pageSize: PAGE_SIZE, pageIndex: 1 }),
    );
  }, [dispatch, onFilter]);

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="font-size16 font-bold title text-uppercase">
            {t.myorder}
          </div>

          <div className="mb-5 mt-4">
            <FilterTab
              items={FILTER_ITEM}
              isActive={onFilter}
              onclick={(id) => {
                setOnFilter(id);
                setPageIndex(1);
              }}
            />
          </div>

          <div className="min-height300">
            {isLoadingHistory && pageIndex === 1 ? (
              <div className="d-flex justify-content-center">
                <img src="/svg/loading.svg" alt="loading" />
              </div>
            ) : (
              <>
                {' '}
                {orderList.data.length === 0 ? (
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ marginTop: '100px' }}
                  >
                    <Icon name="order-empty" />
                    <div className="text-gray3 mb-5 mt-3">
                      {t.youDontHaveOrder}
                    </div>
                    <Link href="/">
                      <button
                        type="button"
                        className="button button-primary size-l px-5"
                      >
                        <a>Tiếp tục mua sắm</a>
                      </button>
                    </Link>
                  </div>
                ) : (
                  orderList.data.map((item) => (
                    <OrderItem
                      key={`${item.orderId}+${item.storeId}`}
                      statusOrder={item.status}
                      total={item.total}
                      orderId={item.orderId}
                      statusPayment={item.statusPayment}
                      products={item.products}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </StyledWrap>
    </div>
  );
};

export default Purchase;
