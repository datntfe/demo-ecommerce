import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const StyledTooltip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  background: #666666;
  border-radius: 4px;
  display: none;
  transition: 0.3s;
  width: 300px;
  font-size: 12px;
  line-height: 17px;
  .polygon {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
  }
`;

interface TollTipProps {
  children: React.ReactNode;
}

const TollTip: React.FC<TollTipProps> = ({ children }) => (
  <StyledTooltip className="toll-tip">
    {children}
    <div className="polygon">
      <Icon name="toll-tip-polygon" />
    </div>
  </StyledTooltip>
);

export default TollTip;
