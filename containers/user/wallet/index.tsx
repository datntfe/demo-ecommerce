import Icon from 'components/common/Icon';
import { BannerWallet } from 'components/users/BannerWallet';
import LeftSide from 'components/users/LeftSide';
import WalletItem from 'components/users/WalletItem';
import { StyledFilterProps } from 'containers/myOrder';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletHistory } from 'redux/action/wallet';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';

const StyledFilter = styled.div<StyledFilterProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  background: ${(props) => (props.isActive ? '#ffffff' : '#eeeeee')};
  border-radius: 2px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  width: calc(100% / 4);
`;

interface StyledTabsFilterProps {
  sizeTabs: number;
  isActive: boolean;
}

const StyledTabsFilter = styled.div<StyledTabsFilterProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 700;
  background: ${(props) => (props.isActive ? '#000000' : '#eeeeee')};
  color: ${(props) => (props.isActive ? '#FFC200' : '#888888')};
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  margin-right: 24px;
  transition: all 0.2s ease;
  width: calc(100% / ${(props) => props.sizeTabs});
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background: #fff;
  }
`;

const StyledWrapTabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: between;
  padding: 3px;
  align-items: center;
  border-radius: 4px;
  background: #f0f0f0;
  margin-bottom: 12px;
`;

const StyledBorder = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 0px 20px 20px 20px;
`;

const StyledTitle = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
`;

const TABS_ITEM = [
  { title: 'Đổi Voucher', id: 0 },
  { title: 'Lịch sử chi tiêu', id: 1 },
  // { title: 'Hướng dẫn nạp tiền', id: 2 },
  // { title: 'Quy chế nạp Shopdi xu', id: 3 },
];

const FILTER_ITEM = [
  { title: 'Tất cả', id: 0 },
  { title: 'Đã nhận', id: 1 },
  { title: 'Đã dùng', id: 2 },
];

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 25px;
    .title {
      border-bottom: 1px solid #c2c2c2;
      padding: 10px 0;
    }
    .bg-gray4 {
      background: #eeeeee;
      border-radius: 2px;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
    }
  }
`;

const activeMenu = '6-1';
const PAGE_SIZE = 15;
const Wallet = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const dispatch = useDispatch();
  const [onFilter, setOnFilter] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [historyByMonth, setHistoryByMonth] = useState({});
  const profile = useSelector((state: RootState) => state.user.profile);
  const isLoadingHistory = useSelector(
    (state: RootState) => state.wallet.isLoadings.getHistory,
  );
  const dataHistory = useSelector((state: RootState) => state.wallet.history);

  useEffect(() => {
    if (
      !isLoadingHistory &&
      dataHistory.pageIndex < dataHistory.totalPaging &&
      pageIndex === dataHistory.pageIndex &&
      dataHistory.data.length > 0 &&
      loadMore
    ) {
      setPageIndex(pageIndex + 1);
      setLoadMore(false);
      dispatch(
        getWalletHistory(
          { type: onFilter, pageSize: PAGE_SIZE, pageIndex: pageIndex + 1 },
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
      getWalletHistory({ type: onFilter, pageSize: PAGE_SIZE, pageIndex: 1 }),
    );
  }, [dispatch, onFilter]);

  useEffect(() => {
    const itemByMonth: any = {};
    dataHistory.data.forEach((item) => {
      const monthNumber = Number(item.createAt.split('/')[1]);
      if (
        !Object.prototype.hasOwnProperty.call(itemByMonth, `${monthNumber}`)
      ) {
        itemByMonth[`${monthNumber}`] = {
          id: monthNumber,
          data: [],
        };
      }
      itemByMonth[`${monthNumber}`].data.push(item);
    });
    setHistoryByMonth(itemByMonth);
  }, [dataHistory]);

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="mb-3 headline-01 title text-uppercase">
            TÀI KHOẢN SHOPDI
          </div>

          <div>
            <BannerWallet />

            {/* <div className='font-size16 font-bold mb-4'>LỊCH SỬ VÍ</div> */}

            {/* <div className="mb-5">
              <StyledWrapTabs> */}
            {/* {FILTER_ITEM.map((item) => (
                  <StyledFilter
                    isActive={item.id === onFilter}
                    key={item.id}
                    onClick={() => {
                      setOnFilter(item.id);
                      setPageIndex(1);
                    }}
                  >
                    {item.title}
                  </StyledFilter>
                ))} */}
            {/* {TABS_ITEM.map((item) => (
                  <StyledTabsFilter
                    isActive={item.id === 1}
                    sizeTabs={TABS_ITEM.length}
                    key={item.id}
                  >
                    {item.title}
                  </StyledTabsFilter>
                ))}
              </StyledWrapTabs>
            </div> */}
            <div>
              {/* <StyledBorder className='d-flex align-items-center'>
                <div className='text-gray3 w-60'>Thông tin thay đổi</div>
                <div className='text-gray3 w-20 text-center'>Trạng thái</div>
                <div className='text-gray3 w-20 text-right'>Xu thay đổi</div>
              </StyledBorder> */}
              <div>
                {isLoadingHistory && pageIndex === 1 ? (
                  <div className="d-flex justify-content-center">
                    <img src="/svg/loading.svg" alt="" />
                  </div>
                ) : (
                  <>
                    {' '}
                    {dataHistory.data.length === 0 ? (
                      <div className="d-flex flex-column align-items-center mt-5">
                        <Icon name="coin-small" size={50} />
                        <div className="text-gray3 mb-5 mt-3">
                          {t.dontHaveHistory}
                        </div>
                      </div>
                    ) : (
                      <>
                        {Object.values(historyByMonth)
                          .reverse()
                          .map((history: any) => {
                            const html = [];
                            html.push(
                              <StyledTitle>
                                {t.month} {history.id}
                              </StyledTitle>,
                            );
                            history.data.forEach((item: any) => {
                              html.push(
                                <WalletItem
                                  key={item.id}
                                  title={item.title}
                                  amount={item.amount}
                                  status={item.status}
                                  time={item.createAt}
                                  type={item.type}
                                />,
                              );
                            });
                            return html;
                          })}
                      </>
                    )}
                    {/* {dataHistory.data.map((item) => (
                      <WalletItem
                        key={item.id}
                        title={item.title}
                        amount={item.amount}
                        status={item.status}
                        time={item.createAt}
                        type={item.type}
                      />
                    ))} */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </StyledWrap>
    </div>
  );
};

export default Wallet;
