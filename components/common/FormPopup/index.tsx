import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

interface FormPopupProps {
  children: React.ReactNode;
  button: string;
  buttonCancel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  width?: number;
  showButton?: boolean;
  zIndex?: number;
  isLoading?: boolean;
}
interface StyledPopupProps {
  width?: number;
  zIndex?: number;
}
const StyledPopup = styled.div<StyledPopupProps>`
  width: ${(props) => (props.width ? `${props.width}px` : '600px')};
  background: #fff;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  z-index: ${(props) => (props.zIndex ? props.zIndex : 97)};
  border-radius: 8px;
  .title {
    text-transform: uppercase;
    font-size: 16px;
    line-height: 20px;
    padding: 20px;
    border-bottom: 1px solid #eeeeee;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media only screen and (max-width: 1199px) {
    width: 100%;
    max-width: 550px;
  }
`;

const StyledRGB = styled.div<StyledPopupProps>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: ${(props) => (props.zIndex ? props.zIndex - 1 : 96)};
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
`;

const FormPopup: React.FC<FormPopupProps> = ({
  children,
  button,
  onConfirm,
  onCancel,
  title,
  width,
  buttonCancel,
  zIndex,
  isLoading,
  showButton = true,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <>
      <StyledRGB zIndex={zIndex} />
      <StyledPopup width={width} zIndex={zIndex}>
        <div className="title">
          <span>{title}</span>
          <span onClick={onCancel} className="cursor-pointer">
            <Icon name="close-icon" />
          </span>
        </div>
        <div className="px-4 py-5">
          {children}
          {showButton && (
            <div className="d-flex aign-items-center mt-5">
              <div className="mr-3 w-50">
                <button
                  className="button button-outline size-l w-100"
                  onClick={onCancel}
                  type="button"
                  disabled={isLoading}
                >
                  {buttonCancel || t.close}
                </button>
              </div>
              <button
                className="button button-primary size-l w-50"
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {button}
              </button>
            </div>
          )}
        </div>
      </StyledPopup>
    </>
  );
};

export default FormPopup;
