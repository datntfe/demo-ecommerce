/* eslint-disable react/void-dom-elements-no-children */
import Icon from 'components/common/Icon';
import { IBiddingStarResponse, User } from 'interfaces/types/lastedBidding';
import en from 'locales/en';
import vn from 'locales/vn';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { transfersCoin } from 'redux/action/wallet';
import {
  buyMoreTimeBiddingSKU,
  getHistoryBiddingDetailSKU,
  getPurchaseBiddingSKU,
  PriceHistory,
  viewRealTimePriceBiddingSKU,
} from 'services/bidding';
import styled from 'styled-components';
import theme from 'styles/theme';
import { formatVietnamDong } from 'utils';
import { formatDate } from 'utils/convertDate';

const StyledPopup = styled.div`
  width: 726px;
  border-radius: 8px;
  @media only screen and (max-width: 1199px) {
    width: 100%;
    max-width: 750px;
  }
  background: ${theme.white};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  flex-direction: column;
  z-index: 99;

  .closeIcon {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  .titlte {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
    line-height: 30px;
  }
  .alert {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .button-view-price {
    background: linear-gradient(92.55deg, #ff512f 0%, #f09819 100%);
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(255, 120, 0, 0.25);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 43px;
    color: white;
  }
  .time {
    font-size: 40px;
    font-weight: 600;
    margin-left: 10px;
  }
  .last-buy-user-item {
    background-color: #fffbeb;
    padding: 10px 20px;
    width: 100%;
    border-bottom: 1px solid #bda25f;
    &:first-child {
      border-top: 1px solid #bda25f;
    }
    &.lastes {
      background-color: #000000;
      color: #15a268;
      position: relative;
    }
    .tag-sale {
      position: absolute;
      top: 0;
      right: 20px;
    }
  }
  .item-history {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    &:hover {
      background-color: #f3f5f7;
    }
  }
  .history {
    height: 466px;
    overflow-y: auto;
  }
`;

const StyledRGB = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
`;

interface PurchasePopup {
  onDeposit: () => void;
  onClose: () => void;
  price: number;
  title: string;
  item: IBiddingStarResponse;
  isLoading?: boolean;
  depositPrice: number;
  ownerCoin: number;
  sku: string;
  viewPrice: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  thumbnail: string;
  onNotEnoughDeposit: () => void;
}

const PurchasePopup: React.FC<PurchasePopup> = ({
  onDeposit,
  onClose,
  price,
  title,
  item,
  isLoading,
  depositPrice,
  ownerCoin,
  sku,
  viewPrice,
  setIsLoading,
  thumbnail,
  onNotEnoughDeposit,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [countDown, setCountDown] = useState(
    Math.floor(item.lockedTime / 1000 - new Date().getTime() / 1000) <= 25
      ? Math.floor(item.lockedTime / 1000 - new Date().getTime() / 1000)
      : 25,
  );
  const [lockedTime, setLockedTime] = useState(item.lockedTime);
  const [users, setUsers] = useState(_.take(item.users ?? [], 3));
  const [lastest, setLastest] = useState<User | undefined>(undefined);
  const [discountPrice, setDiscountPrice] = useState(item.discountPrice);
  const [isSold, setIsSold] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetaiOflPurchase, setShowDetaiOflPurchase] = useState(false);
  const [listHistory, setListHistory] = useState<PriceHistory[]>([]);
  const [listPurchaseHistory, setListPurchaseHistory] = useState<User[]>([]);

  const countdownFunction = () => {
    const leftTime = Math.floor(
      lockedTime / 1000 - new Date().getTime() / 1000,
    );
    if (leftTime >= 0) {
      setCountDown(leftTime);
    }
  };

  useEffect(() => {
    const interval = setInterval(countdownFunction, 500);
    return () => clearInterval(interval);
  }, [lockedTime, countDown]);

  const realTimePrice = async () => {
    if (countDown === 0) {
      return;
    }
    try {
      const result = await viewRealTimePriceBiddingSKU(sku);
      if (result.data.status) {
        if (result.data.data.type === 3) {
          onNotEnoughDeposit();
        }

        if (result.data.data.storage === 0) {
          setIsSold(true);
        }
        if (result.data.data.discountPrice !== 0) {
          setDiscountPrice(result.data.data.discountPrice);
          const tempUsers = [...users];
          if (!lastest) {
            if (
              result.data.data.lastedUser &&
              users?.[0]?.wallet !== result.data.data.lastedUser?.wallet
            ) {
              if (tempUsers.length === 3) {
                tempUsers.splice(2, 1);
                setUsers(tempUsers);
              }
              setLastest(result.data.data.lastedUser);
              setTimeout(() => {
                if (result.data.data.lastedUser) {
                  setUsers([result.data.data.lastedUser, ...tempUsers]);
                  setLastest(undefined);
                }
              }, 5000);
            }
          } else if (
            lastest &&
            lastest.wallet !== result.data.data.lastedUser?.wallet
          ) {
            if (tempUsers.length === 3) {
              tempUsers.splice(2, 1);
              setUsers([lastest, ...tempUsers]);
            }
            setLastest(result.data.data.lastedUser);
            setTimeout(() => {
              if (result.data.data.lastedUser) {
                setUsers([result.data.data.lastedUser, ...tempUsers]);
                setLastest(undefined);
              }
            }, 5000);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(t.hasError);
    }
  };

  useEffect(() => {
    const interval = setInterval(realTimePrice, 1000);
    return () => clearInterval(interval);
  }, [countDown]);

  const buyMoreTime = async () => {
    try {
      setIsLoading(true);

      const result = await buyMoreTimeBiddingSKU(sku);
      if (result.data.status) {
        dispatch(transfersCoin(Number(viewPrice)));
        if (result.data.data.discountPrice !== 0) {
          setDiscountPrice(result.data.data.discountPrice);
          const leftTime =
            lockedTime > new Date().getTime()
              ? lockedTime + result.data.data.extendTime * 1000
              : new Date().getTime() + result.data.data.extendTime * 1000;

          setLockedTime(leftTime);
        }
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(t.hasError);
      setIsLoading(false);
    }
  };

  const getHistory = async (id: string) => {
    try {
      const result = await getHistoryBiddingDetailSKU(id, {
        pageSize: 100,
        pageIndex: 1,
      });
      if (result.data.status) {
        setShowDetaiOflPurchase(true);
        setListHistory(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchaseHistory = async () => {
    if (listPurchaseHistory.length > 0) {
      setShowDetail(true);
    } else {
      try {
        const result = await getPurchaseBiddingSKU(sku, {
          pageSize: 100,
          pageIndex: 1,
        });
        if (result.data.status) {
          setShowDetail(true);
          setListPurchaseHistory(result.data.data);
        }
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!item) {
    return null;
  }
  return (
    <>
      <StyledRGB />
      <StyledPopup>
        {!isSold ? (
          <>
            <div className="closeIcon" onClick={onClose}>
              <Icon name="close-icon" />
            </div>
            <div className="font-size20">{title}</div>
            <div className="image-bid-thumbnail">
              <img src={thumbnail} alt="success-bid" />
              <div className="count-down-realtime">
                <CountdownCircleTimer
                  isPlaying={false}
                  duration={countDown}
                  colors={['#FFD600', '#F7B801', '#A30000', '#A30000']}
                  colorsTime={[15, 10, 5, 0]}
                >
                  {({ remainingTime }) => (
                    <span className="countDownPrice">{`${remainingTime}`}</span>
                  )}
                </CountdownCircleTimer>
              </div>
            </div>
            {countDown === 0 ? (
              <div className="">
                <div className="text-center text-red mb-2 heading-3">
                  {t.overTime}
                </div>
                <div className="text-center body-01">{t.continueLowPrice}</div>
                <div className="text-center body-01">{t.buyMoreTime}</div>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center">
                <div className="text-center heading-3 mbt-5 text-green">
                  {t.hintBid}
                </div>
                <span className="price-discount">
                  {formatVietnamDong(price)}
                </span>
                <span className="price">
                  {formatVietnamDong(discountPrice)}
                </span>
              </div>
            )}

            <div className="mt-3 w-100">
              {lastest && (
                <div className="last-buy-user-item lastes active">
                  {lastest.wallet} {t.ownerProductWith}
                  {formatVietnamDong(lastest.price)}
                  <div className="tag-sale">
                    <img src="/img/tag-sale.png" alt="tag" />
                  </div>
                </div>
              )}

              {(users ?? []).map((u) => (
                <div className="last-buy-user-item">
                  {u.wallet} {t.ownerProductWith} {formatVietnamDong(u.price)}
                </div>
              ))}
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: 20 }}
            >
              {countDown <= 10 && ownerCoin >= viewPrice && (
                <button
                  type="button"
                  className="button button-orange size-l px-5 mrt-3"
                  onClick={buyMoreTime}
                  disabled={isLoading}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="mr-2">
                      {t.moreTime} {viewPrice}
                    </span>
                    <img src="/svg/gold-icon-black.svg" alt="coin" />
                  </div>
                </button>
              )}
              {countDown !== 0 ? (
                <button
                  type="button"
                  className="button button-primary py-3 px-5"
                  onClick={() => {
                    ownerCoin < depositPrice
                      ? onNotEnoughDeposit()
                      : onDeposit();
                  }}
                  disabled={isLoading}
                >
                  <div className="bold mr-2 ml-2" style={{ color: '#FDD83A' }}>
                    {ownerCoin < depositPrice ? (
                      <div className="font-bold d-flex align-items-center">
                        <span className="mr-2">
                          {t.youNeed} {depositPrice}
                        </span>
                        <img src="/svg/gold-icon.svg" alt="coin" />
                        &nbsp; {t.toBid}
                      </div>
                    ) : (
                      <div className="font-bold d-flex align-items-center">
                        <span className="mr-2">
                          {t.depositWith} {depositPrice}
                        </span>
                        <img src="/svg/gold-icon.svg" alt="coin" />
                      </div>
                    )}
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  className="button button-primary size-l px-5"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  <div className="bold mr-2 ml-2" style={{ color: '#FDD83A' }}>
                    <div className="font-bold d-flex align-items-center justify-content-center">
                      {t.anotherPoll}
                    </div>
                  </div>
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="closeIcon" onClick={onClose}>
              <Icon name="close-icon" />
            </div>
            {!showDetail ? (
              <div>
                <div className="d-flex justify-content-center">
                  <div
                    className="image-bid-thumbnail d-flex align-items-center justify-content-center"
                    style={{
                      backgroundImage: `url(${thumbnail})`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <img src="/img/sold.png" alt="success-bid" />
                  </div>
                </div>
                <div className="text-red text-center heading-3 mbt-2">
                  {t.outStock}
                </div>
                <div
                  className="text-center"
                  dangerouslySetInnerHTML={{ __html: t.hintOutStock }}
                />
                <div
                  style={{ color: '#3366FF' }}
                  className="text-center cursor-pointer"
                  onClick={getPurchaseHistory}
                >
                  {t.viewDetailOrder}
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="button button-primary w-100 size-l"
                    onClick={() => router.push('/')}
                  >
                    {t.backToHome}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-100 px-5">
                {!showDetaiOflPurchase ? (
                  <>
                    <div className="font-bold text-left">{t.ownerProduct}</div>
                    <div className="w-100 mt-3 history">
                      {listPurchaseHistory.map((item) => (
                        <div className="d-flex align-item-center justify-content-between item-history align-items-center">
                          <div>
                            <div>{item.wallet}</div>
                            <div>
                              {t.ownerWithPrice}:{' '}
                              <span style={{ color: '#15A268' }}>
                                {formatVietnamDong(item.price)}
                              </span>
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => getHistory(item.id)}
                          >
                            <Icon name="arrow-next" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="d-flex">
                      <div
                        className="font-bold text-left opacity-50 mr-3 cursor-pointer"
                        onClick={() => setShowDetaiOflPurchase(false)}
                      >
                        {t.ownerProduct}
                      </div>
                      <div className="font-bold text-left">{t.detailPoll}</div>
                    </div>
                    <div className="w-100 mt-3 history">
                      {listHistory.map((item) => (
                        <div
                          className="d-flex align-item-center justify-content-between item-history"
                          key={item.createAt}
                        >
                          <div>
                            <div className="font-bold">{item.wallet}</div>

                            <div className="text-gray3 font-size12">
                              {formatDate(item.createAt)}
                            </div>
                          </div>

                          <div>
                            <div
                              style={{
                                color: item.type === 2 ? '#15A268' : '#000000',
                              }}
                            >
                              {formatVietnamDong(Number(item.price))}
                            </div>
                            <div className="text-right">
                              {item.type === 2 ? (
                                <img src="/img/tag-sale-small.png" alt="coin" />
                              ) : (
                                <div>
                                  -{item.point}&nbsp;
                                  <Icon name="coin-small" size={18} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </StyledPopup>
    </>
  );
};

export default PurchasePopup;
