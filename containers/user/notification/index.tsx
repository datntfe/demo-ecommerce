import FilterTab from 'components/common/FilterTab';
import Icon from 'components/common/Icon';
import LeftSide from 'components/users/LeftSide';
import NotificationItem from 'components/users/NotificationItem';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markReadNotification } from 'redux/action/user';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';

const StyledBorder = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 0 0 20px 0px;
`;

const StyledDashed = styled.div`
  width: 96px;
  border: 1px dashed #cccccc;
  height: 1px;
  margin-left: 10px;
  margin-right: 10px;
`;

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
const activeMenu = '4';
const PAGE_SIZE = 10;

const Notification = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const [onFilter, setOnFilter] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const notificationList = useSelector(
    (state: RootState) => state.user.notifications,
  );
  const isLoadingHistory = useSelector(
    (state: RootState) => state.user.isLoadings.getNotification,
  );
  const unreadNotificationQty = useSelector(
    (state: RootState) => state.user.systemStatus?.unreadNotificaitionCount,
  );

  const FILTER_ITEM = [
    { title: t.updateOrder, id: 0 },
    { title: t.promotion, id: 1 },
    // { title: t.updateWallet, id: 2 },
    // { title: t.updateReview, id: 3 },
    { title: t.fromShopdi, id: 2 },
  ];

  useEffect(() => {
    if (
      !isLoadingHistory &&
      notificationList.pageIndex < notificationList.totalPaging &&
      pageIndex === notificationList.pageIndex
    ) {
      setPageIndex(pageIndex + 1);
      setLoadMore(false);
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

  const handleMarkRead = () => {
    dispatch(markReadNotification());
  };

  useEffect(() => {
    dispatch(
      getNotifications({ type: onFilter, pageSize: PAGE_SIZE, pageIndex }),
    );
  }, [dispatch, onFilter, pageIndex]);

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="font-size16 font-bold title mb-3 text-uppercase">
            {t.notification}
          </div>

          <div className="mb-4">
            <FilterTab
              items={FILTER_ITEM}
              isActive={onFilter}
              onclick={(id) => {
                setOnFilter(id);
                setPageIndex(1);
              }}
            />
          </div>
          {/* <div className="mb-4 d-flex align-items-center justify-content-center">
            <img src="/svg/noti-ship-type-1.svg" alt="noti" />
            <span className="text-gray3 ml-2">{t.confirmCheckout}</span>
            <StyledDashed />
            <img src="/svg/noti-ship-type-2.svg" alt="noti" />
            <span className="text-gray3 ml-2">{t.inShipping}</span>
            <StyledDashed />
            <img src="/svg/noti-ship-type-3.svg" alt="noti" />
            <span className="text-gray3 ml-2">{t.shippSuccess}</span>
          </div> */}
          <div className="mt-5">
            <StyledBorder className="d-flex justify-content-between align-items-center mb-5">
              <div className="font-size16">
                {FILTER_ITEM.find((item) => item.id === onFilter)?.title}
              </div>
              {/* <div
                className={`text-blue2 mr-3 cursor-pointer ${
                  (unreadNotificationQty ?? 0) > 0
                    ? 'opacity-100'
                    : 'opacity-50'
                }`}
                onClick={handleMarkRead}
              >
                {t.markViewAll} <Icon name="tick" />
              </div> */}
              <button
                type="button"
                className="button button-primary size-l py-3 px-5"
                disabled={(unreadNotificationQty ?? 0) === 0}
              >
                {t.markViewAll}
              </button>
            </StyledBorder>
            <div className="min-height300">
              {isLoadingHistory && pageIndex === 1 ? (
                <div className="d-flex justify-content-center">
                  <img src="/svg/loading.svg" alt="noti" />
                </div>
              ) : (
                <>
                  {' '}
                  {notificationList.data.length === 0 ? (
                    <div
                      className="d-flex flex-column align-items-center"
                      style={{ marginTop: '100px' }}
                    >
                      <img src="/svg/empty-notification.svg" alt="noti" />
                      <div className="text-gray3 mb-5 mt-3">
                        {t.dontHaveNotification}
                      </div>
                    </div>
                  ) : (
                    notificationList.data.map((item) => (
                      <NotificationItem
                        image={item.image}
                        description={item.description}
                        orderId={item.childCode}
                        createdDate={item.createAt}
                        key={item.childCode}
                        title={item.title}
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

export default Notification;
