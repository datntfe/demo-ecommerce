import Icon from 'components/common/Icon';
import React from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  padding-left: 20px;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: space-between;
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
  .button-bottom {
    background: #cccccc;
    border-radius: 8px 8px 0px 0px;
    width: 60px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15px;
  }
`;

interface StyledIconShipProps {
  isSuccess: boolean;
}

const StyledIconShip = styled.div<StyledIconShipProps>`
  position: relative;
  width: 2px;
  height: ${(props) => (!props.isSuccess ? '100%' : '70%')};
  background-color: #cccccc;
  margin-left: 80px;
  margin-right: 20px;
  align-self: flex-end;
  .icon {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: ${(props) => (props.isSuccess ? '0' : '30%')};
  }
`;

interface NotificationItemChildProps {
  title: string;
  time: string;
  isSuccess: boolean;
  summary: string;
}

const NotificationItemChild: React.FC<NotificationItemChildProps> = ({
  title,
  time,
  isSuccess,
  summary,
}) => (
  <StyledWrap>
    <div className="d-flex align-items-center h-100">
      <StyledIconShip isSuccess={isSuccess}>
        <div className="icon">
          {isSuccess ? (
            <Icon name="dot-ship" className="big" />
          ) : (
            <Icon name="dot-ship-default" />
          )}
        </div>
      </StyledIconShip>
      <div className="d-flex justify-content-center flex-column">
        <div className="font-bold mb-1 text-blue2 font-size16">{title}</div>
        <div className="mb-1">{summary}</div>
        <div>
          <span className="text-gray">{time}</span>
        </div>
      </div>
    </div>
  </StyledWrap>
);

export default NotificationItemChild;
