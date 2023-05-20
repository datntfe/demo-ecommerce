import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import Icon from 'components/common/Icon';
import Countdown from 'react-countdown';
import { formatVietnamDong } from 'utils';
import Link from 'next/link';

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
      {hours <= 9 ? `0${hours}` : hours}:{minutes <= 9 ? `0${minutes}` : minutes}:
      {seconds <= 9 ? `0${seconds}` : seconds}
    </span>
  );
};

interface StyledItemHotProps {
  isBig: boolean;
  sku?: string;
}

const StyledItemHot = styled.div<StyledItemHotProps>`
  width: 100%;
  p,
  a {
    z-index: 2;
  }
  .mark {
    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8463979341736695) 0%, rgba(0, 0, 0, 0.23855479691876746) 100%);
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  & .image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  & .image img {
    border-radius: 12px;
    max-width: 100%;
    height: 220px;
  }
  & .title {
    font-weight: 700;
    font-size: ${(props) => (props.isBig ? '24px' : '16px')};
    color: ${theme.white};
    position: absolute;
    left: ${(props) => (props.isBig ? '25px' : '15px')};
    bottom: ${(props) => (props.isBig ? '115px' : '75px')};
    font-size: ${(props) => (props.isBig ? '24px' : '16px')};
    z-index: 2;
  }
  .title-price {
    font-weight: 400;
    // #8c8c8c;
    font-size: ${(props) => (props.isBig ? '24px' : '16px')};
    color: ${theme.text_gray3};
    position: absolute;
    left: ${(props) => (props.isBig ? '25px' : '15px')};
    bottom: ${(props) => (props.isBig ? '75px' : '55px')};
    font-size: ${(props) => (props.isBig ? '16px' : '13px')};
    z-index: 2;
  }
  & .price {
    font-size: 24px;
    line-height: 25px;
    color: #000;
    margin-right: 15px;
    z-index: 2;
  }
  & .discount {
    color: ${theme.text_gray3};
  }
  & button {
    left: ${(props) => (props.isBig ? '25px' : '15px')};
    bottom: ${(props) => (props.isBig ? '30px' : '20px')};
    font-weight: 700;
    position: absolute;
    border-radius: 6px;
    text-align: center;
    padding: 10px 20px;
    background-color: ${`${theme.yellow}`};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    &: hover {
      opacity: 0.8;
    }
  }
  .tag-hot {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
  }
  .bow-tie {
    position: absolute;
    left: -10px;
    top: -10px;
    color: ${theme.white};
    z-index: 2;
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
    z-index: 2;
  }
`;

interface ItemHotProps {
  id: string;
  itemName: string;
  image: string;
  price: number;
  onBuy: (id: string) => void;
  timeLeft: number;
  isBig: boolean;
  sku?: string;
  maxHeight?: boolean;
}

const ItemHot: React.FC<ItemHotProps> = ({
  itemName,
  image,
  price,
  onBuy,
  timeLeft,
  id,
  isBig,
  sku,
  maxHeight,
}: ItemHotProps) => (
  <StyledItemHot isBig={isBig} className={maxHeight ? 'h-100' : ''}>
    <div className={`image ${maxHeight ? 'h-100' : ''}`}>
      <div className="bow-tie">
        <Icon name="bow-tie-big" />
      </div>
      <div className="count-down">
        <Countdown date={timeLeft} renderer={renderer} />
      </div>
      <p className="title">{itemName}</p>
      <p className="title-price">
        Giá thị trường: <s>{formatVietnamDong(price)}</s>
      </p>
      <div className="mark" />

      <img src={image} alt={itemName} />

      <Link href={`/products/${sku}`}>
        <a>
          <button onClick={() => onBuy(id)} type="button">
            XEM GIÁ BÁN
          </button>
        </a>
      </Link>
    </div>
  </StyledItemHot>
);

export default ItemHot;
