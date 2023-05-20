import React from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'components/common/Icon';

interface AlertPopupProps {
  content: React.ReactNode;
  button: string;
  onConfirm: () => void;
  iconName: IconName;
  onCancel?: () => void;
}

const StyledPopup = styled.div`
  @media only screen and (max-width: 1199px) {
    width: 100%;
    min-width: auto;
    max-width: 550px;
  }
  min-width: 540px;
  background: #fff;
  border-radius: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  flex-direction: column;
  z-index: 99;
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const StyledRGB = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
`;

const AlertPopup: React.FC<AlertPopupProps> = ({
  content,
  button,
  onConfirm,
  iconName,
  onCancel,
}) => (
  <>
    <StyledRGB />
    <StyledPopup>
      {onCancel && (
        <span onClick={onCancel} className="cursor-pointer close-icon">
          <Icon name="close-icon" />
        </span>
      )}
      <div className="mb-4">
        <Icon name={iconName} />
      </div>

      {content}
      <button
        className="button button-primary py-3 px-5 mt-4"
        type="button"
        onClick={onConfirm}
      >
        {button}
      </button>
    </StyledPopup>
  </>
);

export default AlertPopup;
