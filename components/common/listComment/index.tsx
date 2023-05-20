import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import theme from 'styles/theme';
import { formatDate } from 'utils/convertDate';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';
import Lightbox from 'react-image-lightbox';

const StyledRateComment = styled.div`
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    flex-shrink: 0;
    img {
      border-radius: 50%;
    }
  }
  .small-text {
    font-size: 12px;
    line-height: 16px;
    color: ${theme.text_gray3};
  }
  .text-name {
    font-weight: 600;
  }
  padding: 15px 30px;
  border-bottom: 1px solid #eeeeee;
  &:last-child {
    border-bottom: none;
  }
`;
const StyledImage = styled.div`
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  margin-right: 12px;
  img {
    max-width: 100%;
    max-height: 80px;
    border-radius: 8px;
  }
`;

export const renderStar = (star: number) => {
  const result: React.ReactNode[] = [];
  for (let i = 0; i < star; i++) {
    result.push(
      <span key={i} className="mr-1">
        <Icon name="rate-star" />
      </span>,
    );
  }
  return result;
};
interface RateCommentProps {
  name: string;
  isBuy: boolean;
  avatar?: string;
  rate: number;
  reviews: string;
  comment: string;
  images: string[];
  createAt: Date;
}
const RateComment: React.FC<RateCommentProps> = ({
  name,
  isBuy,
  avatar,
  rate,
  reviews,
  comment,
  images,
  createAt,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [indexOfImg, setIndexOfImg] = useState(0);
  const [isOpenImg, setIsOpenImg] = useState(false);
  return (
    <StyledRateComment>
      {isOpenImg && (
        <Lightbox
          mainSrc={images[indexOfImg]}
          nextSrc={images[(indexOfImg + 1) % images.length]}
          prevSrc={images[(indexOfImg + images.length - 1) % images.length]}
          onCloseRequest={() => {
            setIsOpenImg(false);
          }}
          onMovePrevRequest={() => {
            setIndexOfImg((indexOfImg + images.length - 1) % images.length);
          }}
          onMoveNextRequest={() => {
            setIndexOfImg((indexOfImg + 1) % images.length);
          }}
        />
      )}
      <div className="d-flex">
        <div className="avatar">
          <img src={avatar || '/img/avatar1.png'} alt="avtar" />
        </div>
        <div>
          <div className="text-name">{name}</div>
          {isBuy && (
            <div>
              <span className="small-text mr-1">{t.ordered}</span>
              <Icon name="icon-tick" />
            </div>
          )}

          <div className="d-flex align-items-center small-text mb-2">
            {renderStar(rate)}
          </div>
          <div className="small-text mb-4">
            {formatDate(createAt.toString())}
          </div>
          <div>{reviews}</div>
          {(images ?? []).length > 0 && (
            <div className="d-flex align-items-center mt-3">
              {(images ?? []).map((item, i) => {
                if (item.length === 0) {
                  return;
                }
                return (
                  <StyledImage
                    key={`${item}_${i}`}
                    onClick={() => setIsOpenImg(true)}
                  >
                    <img src={item} alt="name" />
                  </StyledImage>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </StyledRateComment>
  );
};

export default RateComment;
