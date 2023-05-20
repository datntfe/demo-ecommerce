/* eslint-disable react/void-dom-elements-no-children */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import Icon from 'components/common/Icon';
import { formatVietnamDong } from 'utils';
import { IBiddingStarResponse } from 'interfaces/types/lastedBidding';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';

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
  padding: 40px;
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

interface PurchaseOld {
  onDeposit: () => void;
  onClose: () => void;
  discountPrice: number;
  price: number;
  title: string;
  item: IBiddingStarResponse;
  isLoading?: boolean;
  depositPrice: number;
  ownerCoin: number;
  thumbnail: string;
  onNotEnoughDeposit: () => void;
}

const PurchaseOld: React.FC<PurchaseOld> = ({
  onDeposit,
  onClose,
  price,
  title,
  item,
  isLoading,
  depositPrice,
  ownerCoin,
  discountPrice,
  thumbnail,
  onNotEnoughDeposit,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [countDown, setCountDown] = useState(
    Math.floor(item.lockedTime / 1000 - new Date().getTime() / 1000) <= 25
      ? Math.floor(item.lockedTime / 1000 - new Date().getTime() / 1000)
      : 25,
  );
  const [lockedTime, setLockedTime] = useState(item.lockedTime);

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

  if (!item) {
    return null;
  }
  return (
    <>
      <StyledRGB />
      <StyledPopup>
        <div className="closeIcon" onClick={onClose}>
          <Icon name="close-icon" />
        </div>
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

        <div className="big-title-2-mobile">
          {t.youHave} <span className="text-red">{countDown}s</span> {t.toBid}
        </div>
        <div className="headline-01">
          {title} {t.withPrice}
        </div>
        <div className="mt-5 mb-5">
          <div className="d-flex flex-column align-items-center">
            <span className="price-discount">{formatVietnamDong(price)}</span>
            <span className="price">{formatVietnamDong(discountPrice)}</span>
          </div>
        </div>
        {countDown === 0 ? (
          <div className="">
            <div className="text-center text-red mb-2 font-bold font-size16">
              {t.overTime}
            </div>
            <div className="text-center">{t.continueLowPrice}</div>
          </div>
        ) : (
          <div className="text-center font-size20">{t.hintBid}</div>
        )}
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 20 }}
        >
          {countDown !== 0 ? (
            <button
              type="button"
              className="button button-primary py-3 px-5"
              onClick={() => {
                ownerCoin < depositPrice ? onNotEnoughDeposit() : onDeposit();
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
              className="button button-primary py-4 px-5"
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
      </StyledPopup>
    </>
  );
};

export default PurchaseOld;
