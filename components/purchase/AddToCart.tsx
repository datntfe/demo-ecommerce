import Icon from 'components/common/Icon';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isAddToCart } from 'redux/action/cart';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledAdd = styled.div`
  width: 245px;
  position: absolute;
  right: 0;
  top: 50px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 15px;
  .button {
    background: ${theme.yellow};
    border-radius: 4px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    padding: 8px 15px;
    a {
      color: ${theme.text};
    }
  }
  .add-to {
    font-size: 12px;
    margin-left: 5px;
  }
`;

const AddToCart: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setTimeout(() => {
      dispatch(isAddToCart(false));
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <StyledAdd>
      <div className="d-flex align-items-center mb-3">
        <Icon name="checked" />
        <span className="add-to">Thêm vào giỏ hàng thành công!</span>
      </div>
      <button type="button" className="button">
        <Link href="/cart">
          <a> XEM GIỎ HÀNG & THANH TOÁN</a>
        </Link>
      </button>
    </StyledAdd>
  );
};

export default AddToCart;
