import Icon from 'components/common/Icon';
import React from 'react';
import styled from 'styled-components';
import { formatVietnamDong } from 'utils';

interface StyledWrapProps {
  opacity: number;
}

const StyledWrap = styled.div<StyledWrapProps>`
  height: 80px;
  width: 100%;
  position: relative;
  padding-left: 110px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  background: ${(props) => `rgba(255, 255, 255, ${props.opacity})`};
  backdrop-filter: blur(15px);
  border-radius: 8px;
  margin-bottom: 20px;
  justify-content: space-between;
  &:last-child {
    // margin-bottom: 0px;
  }
  .box-img {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 5px;
    left: 10px;
    .bg1 {
      background-color: #ff8400;
      opacity: 0.7;
      border-radius: 8px;
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0px;
      left: 0px;
      z-index: 2;
    }
    .bg2 {
      background-color: #fff;
      border-radius: 8px;
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 5px;
      left: 0px;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-height: 80px;
        border-radius: 8px;
      }
    }
  }
  .shockPrice {
    position: absolute;
    right: -7px;
    bottom: 12px;
  }
`;

interface JustBuyProps {
  userName: string;
  productTitle: string;
  price: number;
  time: string;
  image: string;
  opacity: number;
  isHot?: boolean;
}

export const JustBuy: React.FC<JustBuyProps> = ({
  userName,
  productTitle,
  price,
  time,
  image,
  opacity,
  isHot,
}) => (
  <StyledWrap opacity={opacity}>
    {isHot && (
      <div className="shockPrice">
        <img src="/svg/sockPrice.svg" />
      </div>
    )}

    <div className="box-img">
      <div className="bg1" />
      <div className="bg2">
        <img src={image} />
      </div>
    </div>
    <div>
      <div className="mb-2">
        <b>{userName}</b>&nbsp;<span>vừa mua được sản phẩm</span>
      </div>
      <div>
        {productTitle}&nbsp;
        <span>với giá</span>&nbsp;
        <span className="text-blue22">
          <b>{formatVietnamDong(price)}</b>
        </span>
      </div>
    </div>
    <div>
      <Icon name="clock" />
      &nbsp;
      <span className="font-size12">{time}</span>
    </div>
  </StyledWrap>
);
