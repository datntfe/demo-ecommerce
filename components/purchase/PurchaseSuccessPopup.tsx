/* eslint-disable react/void-dom-elements-no-children */
import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getHistoryBiddingDetailSKU, PriceHistory } from 'services/bidding';
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
  .price-discount {
    font-size: 36px;
    line-height: 20px;
    color: ${theme.text_gray3};
    text-decoration: line-through;
  }
  .price {
    font-size: 42px;
    line-height: 60px;
    color: #15a268;
  }
  .time {
    font-size: 40px;
    font-weight: 600;
    margin-left: 10px;
  }
  .congralation {
    color: #15a268;
    margin-bottom: 10px;
  }
  .item-history {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
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

interface PurchaseSuccessPopup {
  onDeposit: () => void;
  onClose: () => void;
  discountPrice: number;
  thumbnail: string;
  originalPrice: number;
  id: string;
  showDetailButton: boolean;
}

const PurchaseSuccessPopup: React.FC<PurchaseSuccessPopup> = ({
  onClose,
  discountPrice,
  onDeposit,
  thumbnail,
  originalPrice,
  showDetailButton,
  id,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [listHistory, setListHistory] = useState<PriceHistory[]>([]);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const getHistory = async () => {
    if (listHistory.length > 0) {
      setShowDetail(true);
    } else {
      try {
        const result = await getHistoryBiddingDetailSKU(id, {
          pageSize: 100,
          pageIndex: 1,
        });
        if (result.data.status) {
          setShowDetail(true);
          setListHistory(result.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <StyledRGB />
      <StyledPopup>
        <div
          className="closeIcon"
          onClick={() => (!showDetail ? onClose() : setShowDetail(false))}
        >
          <Icon name="close-icon" />
        </div>
        {!showDetail ? (
          <div>
            <div className="font-size20 text-uppercase text-center mt-3 mb-3 font-bold image-bid-success">
              <img src={thumbnail} alt="success-bid" />
            </div>

            <div className="mt-5 mb-3">
              <div className="heading-3 text-green text-center">
                {t.congratulation}!
              </div>
              <div
                className="text-center"
                dangerouslySetInnerHTML={{ __html: t.hintPurchaseBid }}
              />
              {showDetailButton && (
                <div
                  style={{ color: '#3366FF' }}
                  className="text-center cursor-pointer"
                  onClick={() => getHistory()}
                >
                  {t.viewDetailOrder}
                </div>
              )}

              <div className="d-flex flex-column align-items-center mt-5">
                <span className="price-discount">
                  {formatVietnamDong(originalPrice)}
                </span>
                <span className="price">
                  {formatVietnamDong(discountPrice)}
                </span>
              </div>
            </div>

            <div
              className="d-flex justify-content-center flex-column"
              style={{ marginTop: 20 }}
            >
              <button
                type="button"
                className="button button-primary py-4 px-5"
                onClick={onDeposit}
              >
                <div className="bold mr-4 ml-4" style={{ color: '#FDD83A' }}>
                  <div className="font-bold d-flex align-items-center justify-content-center">
                    {t.checkoutNow}
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-100 px-5">
            <div className="font-bold">{t.detailPoll}</div>
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
                      style={{ color: item.type === 2 ? '#15A268' : '#000000' }}
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
      </StyledPopup>
    </>
  );
};

export default PurchaseSuccessPopup;
