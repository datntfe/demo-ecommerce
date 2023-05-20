import Icon from 'components/common/Icon';
import HistoryItem from 'components/users/HistoryItem';
import LeftSide from 'components/users/LeftSide';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBidHistories,
  getOrderHistories,
  getProductFavoriteHistory,
} from 'redux/action/user';
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
const activeMenu = '2';
const PAGE_SIZE = 15;

const History = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const [onFilter, setOnFilter] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const orderHistoryList = useSelector(
    (state: RootState) => state.user.orderHistories,
  );
  const BidHistoryList = useSelector(
    (state: RootState) => state.user.bidHistories,
  );
  const productFavoriteList = useSelector(
    (state: RootState) => state.user.productFavoriteHistories,
  );
  const isLoadingHistory = useSelector(
    (state: RootState) => state.user.isLoadings.getHistory,
  );

  useEffect(() => {
    if (isLoadingHistory || !loadMore) {
      setLoadMore(false);
      return;
    }
    switch (onFilter) {
      case 0:
        if (
          orderHistoryList.pageIndex < orderHistoryList.totalPaging &&
          pageIndex === orderHistoryList.pageIndex
        ) {
          setPageIndex(pageIndex + 1);
          setLoadMore(false);
        }
        break;
      case 1:
      case 2:
        if (
          BidHistoryList.pageIndex < BidHistoryList.totalPaging &&
          pageIndex === BidHistoryList.pageIndex
        ) {
          setPageIndex(pageIndex + 1);
          setLoadMore(false);
        }
        break;

      case 3:
        if (
          productFavoriteList.pageIndex < productFavoriteList.totalPaging &&
          pageIndex === productFavoriteList.pageIndex
        ) {
          setPageIndex(pageIndex + 1);
          setLoadMore(false);
        }
        break;

      default:
        break;
    }

    setLoadMore(false);
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
    switch (onFilter) {
      case 0:
        dispatch(getOrderHistories({ pageSize: PAGE_SIZE, pageIndex }));
        break;
      case 1:
        dispatch(getBidHistories({ type: 2, pageSize: PAGE_SIZE, pageIndex }));
        break;
      case 2:
        dispatch(getBidHistories({ type: 3, pageSize: PAGE_SIZE, pageIndex }));
        break;

      case 3:
        dispatch(getProductFavoriteHistory({ pageSize: PAGE_SIZE, pageIndex }));

        break;

      default:
        break;
    }
  }, [dispatch, onFilter, pageIndex]);

  const dataRender = useMemo(() => {
    switch (onFilter) {
      case 0:
        return orderHistoryList;
      case 1:
        return BidHistoryList;
      case 2:
        return BidHistoryList;
      case 3:
        return productFavoriteList;

      default:
        return orderHistoryList;
    }
  }, [BidHistoryList, onFilter, orderHistoryList, productFavoriteList]);

  const FILTER_ITEM = [
    { title: t.bought, id: 0 },
    { title: t.viewPrice, id: 1 },
    { title: t.bidded, id: 2 },
    // { title: t.loved, id: 3 },
  ];

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="font-bold title text-uppercase">{t.history}</div>

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

          <div>
            <div className="title-section font-size16">
              {`${t.item} ${FILTER_ITEM.find(
                (item) => item.id === onFilter,
              )?.title.toLowerCase()}`}
            </div>

            <div className="min-height300">
              {isLoadingHistory && pageIndex === 1 ? (
                <div className="d-flex justify-content-center">
                  <img src="/svg/loading.svg" />
                </div>
              ) : (
                <>
                  {' '}
                  {dataRender.data.length === 0 ? (
                    <div
                      className="d-flex flex-column align-items-center"
                      style={{ marginTop: '100px' }}
                    >
                      <Icon name="order-empty" />
                      <div className="text-gray3 mb-5 mt-3">
                        {t.dontHaveHistory}
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
                    dataRender.data.map((item) => (
                      <HistoryItem
                        key={item.orderId}
                        image={item.image}
                        title={item.name}
                        time={item.createdDate}
                        price={item.price}
                        type={item.type}
                        onFilter={onFilter}
                      />
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </StyledWrap>
    </div>
  );
};

export default History;
