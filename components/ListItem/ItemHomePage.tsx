import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { formatVietnamDong } from 'utils';

// Random component
const Completionist = () => <span>Ended!</span>;

interface rendererProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }: rendererProps) => {
  if (completed) {
    return <Completionist />;
  }
  return (
    <span>
      {hours <= 9 ? `0${hours}` : hours}:
      {minutes <= 9 ? `0${minutes}` : minutes}:
      {seconds <= 9 ? `0${seconds}` : seconds}
    </span>
  );
};

const StyledItemHome = styled.div`
  width: 200px;
  margin-bottom: 30px;
  & .image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 260px;
    border-radius: 8px 8px 0 0;
    background: #fff;
  }
  & .image img {
    border-radius: 12px;
    max-width: 100%;
  }
  & .title {
    font-weight: 600;
    line-height: 20px;
    margin-top: 10px;
    min-height: 40px;
    color: ${theme.text};
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  & .price {
    font-size: 24px;
    line-height: 25px;
    color: #000;
    margin-right: 15px;
  }
  & .discount {
    color: ${theme.text_gray3};
  }
  & .button {
    position: relative;
    border-radius: 0px 0px 6px 6px;
    text-align: center;
    font-size: 16px;
    width: 100%;
    color: ${theme.orange};
    padding: 10px 0;
    background-color: #374756;
    display: flex;
    align-items: center;
    justify-content: center;
    .text-black {
      font-size: 16;
      color: ${theme.text_gray2};
      margin-right: 2px;
    }
    &: hover {
      opacity: 0.8;
    }
  }
  .tag-hot {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .bow-tie {
    position: absolute;
    left: -5px;
    top: -5px;
    color: ${theme.white};
    .text-bow {
      font-size: 12px;
      color: ${theme.white};
      font-weight: 700;
      transform: rotate(-45deg) translate(25px, -46px);
      text-align: center;
      display: block;
    }
  }
  .count-down {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 2px 8px;
    color: ${theme.yellow};
    letter-spacing: 2px;
  }
  .fix-position {
    position: relative;
    top: 1px;
  }
  .view-price {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

interface ItemHomeProps {
  id: string;
  itemName: string;
  image: string;
  price: number;
  discountPercent: number;
  viewPrice?: number;
  isHot: boolean;
  onBuy: () => void;
  onViewPrice: () => void;
  timeLeft?: number;
  textBow?: string;
  sku: string;
  isBidItem?: boolean;
}

const ItemHome: React.FC<ItemHomeProps> = ({
  itemName,
  image,
  price,
  discountPercent,
  onBuy,
  onViewPrice,
  timeLeft,
  id,
  viewPrice,
  isHot,
  textBow,
  sku,
  isBidItem,
}: ItemHomeProps) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <StyledItemHome className="item-home">
      <Link href={`/products/${sku}`}>
        <a>
          <div className="image">
            <img src={image} alt={itemName} />
            {isHot && (
              <div className="tag-hot">
                <Icon name="bg-hot-button" />
              </div>
            )}
            {textBow && (
              <div className="bow-tie">
                <Icon name="bow-tie" />
                <span className="text-bow">{textBow}</span>
              </div>
            )}

            {/* <div className="count-down">
            <Countdown date={timeLeft} renderer={renderer} />
          </div> */}
          </div>
          <div
            style={{ padding: '0 4px' }}
            className="d-flex align-items-center justify-content-between mb-3 mt-2"
          >
            <div>
              <Icon name="heart-active" size={16} />
              <span className="text-gray3 font-size12 ml-2">12</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-gray3 font-size12 mr-2 fix-position">
                1.2k
              </span>
              <div className="mr-1">
                <Icon name="rate-star-full" size={10} />
              </div>
              <div className="mr-1">
                <Icon name="rate-star-full" size={10} />
              </div>
              <div className="mr-1">
                <Icon name="rate-star-full" size={10} />
              </div>
              <div className="mr-1">
                <Icon name="rate-star-full" size={10} />
              </div>
              <div className="mr-2">
                <Icon name="rate-star-half" size={10} />
              </div>
            </div>
          </div>
          <p style={{ padding: '0 4px' }} className="title">
            {itemName}
          </p>
        </a>
      </Link>

      <div
        style={{ padding: '0 4px' }}
        className="d-flex align-items-center mb-4 justify-content-between"
      >
        <p className="font-size13 text-gray3 mb-0">Giá bán:</p>
        <p className="font-bold mb-0">{formatVietnamDong(price ?? 0)}</p>
      </div>

      <div className="btnBid">
        <button
          className="hint button mt-2"
          type="button"
          onClick={onViewPrice}
        >
          <span className="text-white">XEM GIÁ</span>
          <div className=" view-price d-flex align-items-center">
            <Icon name="coin-small" />
            <span className="text-white font-size14 ml-2 fix-position font-bold">
              {viewPrice ?? 12}
            </span>
          </div>
        </button>

        <button className="bid button mt-2" type="button" onClick={onViewPrice}>
          <span className="bidtext text-white">GIÁ BÍ MẬT</span>
        </button>
      </div>
    </StyledItemHome>
  );
};

export default ItemHome;
