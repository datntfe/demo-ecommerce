import { OrderHistoryType } from 'interfaces/types/user';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { formatVietnamDong } from 'utils';

const StyledWrap = styled.div`
  padding: 20px 30px;
  display: flex;
  align-items: center;
  .image {
    border: 1px solid #eeeeee;
    border-radius: 4px;
    margin-right: 10px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  border-bottom: 1px solid #eeeeee;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f6f6f6;
  }
`;

interface HistoryItemProps {
  image: string;
  title: string;
  price: number;
  type: OrderHistoryType;
  time: string;
  onFilter: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  image,
  title,
  type,
  price,
  time,
  onFilter,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const renderTitle = () => {
    switch (onFilter) {
      case 0:
        return t.buyWithPrice;
      case 1:
        return t.viewPrice;
      case 2:
        return t.bided;
      case 3:
        return t.loved;

      default:
        break;
    }
  };

  const renderType = () => {
    switch (type) {
      case 1:
        return t.based;
      case 2:
        return t.hidden;
      case 3:
        return t.normal;
      default:
        return '';
    }
  };

  return (
    <StyledWrap>
      <div className="image">
        <img src={image} alt="image1" />
      </div>
      <div>
        <div className="font-bold mb-1">{title}</div>
        <div className="mb-1">
          <span className="text-gray3">{t.salePrice}:&nbsp;</span>
          <span className="font-bold">{formatVietnamDong(price)}</span>
        </div>
        <div>
          <span className="text-gray3">{renderTitle()}&nbsp;</span>
          <span className="font-bold">{onFilter === 0 && renderType()}</span>
          <span className="text-gray">&nbsp;- {time}</span>
        </div>
      </div>
    </StyledWrap>
  );
};

export default HistoryItem;
