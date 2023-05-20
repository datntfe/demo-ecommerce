import React from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  width: 15px;
  height: 15px;
  color: #fff;
  background-color: #ff5757;
  font-size: 10px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -4px;
  right: 2px;
`;

interface NumberAlertProps {
  qty: number;
}

export const NumberAlert: React.FC<NumberAlertProps> = ({ qty }) => <StyledWrap className="noti">{qty}</StyledWrap>;

export default NumberAlert;
