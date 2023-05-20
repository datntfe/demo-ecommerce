import Icon from 'components/common/Icon';
import InputCustom from 'components/common/Input';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  margin-bottom: 50px;
  .title-page {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .bg-gray4 {
    background: #eeeeee;
    border-radius: 10px;
  }
  .search {
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0px 20px;
    input {
      border: none;
      font-size: 12px;
      width: 100%;
      margin-left: 10px;
    }
  }
`;
export interface StyledFilterProps {
  isActive: boolean;
}

const StyledFilter = styled.div<StyledFilterProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  background: ${(props) => (props.isActive ? '#000000' : '#eeeeee')};
  color: ${(props) => (props.isActive ? '#FFC200' : '#888888')};
  border-radius: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
`;

const FILTER_ITEM = [
  { title: 'Tất cả', id: 1 },
  { title: 'Chờ thanh toán', id: 2 },
  { title: 'Đang xử lý', id: 3 },
  { title: 'Đang vận chuyển', id: 4 },
  { title: 'Đã giao', id: 5 },
  { title: 'Đã hủy', id: 6 },
];

const FAKE_ITEM = [
  {
    image: '/img/product-cart.png',
    title:
      'Điện Thoại iPhone 13 128GB - Hàng Chính Hãng Cùng Với Text Giả Cho Tiêu Đề Dài Ra',
    attribute: [{ attribute_name: '1212', attribute_code: '123' }],
    discountPrice: 21500,
    price: 25000,
    orderId: 1,
    type: 1,
    quantity: 1,
    total: 1,
    storeName: 'hehe',
  },
  {
    image: '/img/product-cart.png',
    title:
      'Điện Thoại iPhone 13 128GB - Hàng Chính Hãng Cùng Với Text Giả Cho Tiêu Đề Dài Ra',
    attribute: [{ attribute_name: '1212', attribute_code: '123' }],
    discountPrice: 21500,
    price: 25000,
    orderId: 1,
    type: 1,
    quantity: 5,
    total: 1,
    storeName: 'hehe',
  },
  {
    image: '/img/product-cart.png',
    title:
      'Điện Thoại iPhone 13 128GB - Hàng Chính Hãng Cùng Với Text Giả Cho Tiêu Đề Dài Ra',
    attribute: [{ attribute_name: '1212', attribute_code: '123' }],
    discountPrice: 21500,
    price: 25000,
    orderId: 1,
    type: 2,
    quantity: 10,
    total: 1,
    storeName: 'name',
  },
];

const MyOrderContainer: React.FC = () => {
  const [onFilter, setOnFilter] = useState(1);

  return (
    <StyledWrap className="container">
      <div className="title-page">ĐƠN HÀNG CỦA TÔI</div>
      <div className="d-flex  align-items-center mb-5">
        <div className="col-lg-8">
          <div className="d-flex align-items-center p-1 bg-gray4 justify-content-between">
            {FILTER_ITEM.map((item) => (
              <StyledFilter
                isActive={item.id === onFilter}
                key={item.id}
                onClick={() => setOnFilter(item.id)}
              >
                {item.title}
              </StyledFilter>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="search align-items-center">
            <Icon name="search-black" />
            <InputCustom
              type="text"
              placeholder="Tên shop, ID đơn hàng hoặc Tên sản phẩm"
              onChange={() => null}
            />
          </div>
        </div>
      </div>
      {/* <div>
        {FAKE_ITEM.map((item) => (
          <OrderItem {...item} key={item.orderId} />
        ))}
      </div> */}
    </StyledWrap>
  );
};

export default MyOrderContainer;
