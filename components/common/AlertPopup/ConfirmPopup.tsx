import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

interface ConfirmPopupProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  isLoading?: boolean;
  buttonConfirmContent?: string;
  header?: boolean;
}

const StyledPopup = styled.div`
  @media only screen and (max-width: 1199px) {
    width: 100%;
    min-width: auto;
    max-width: 550px;
  }
  min-width: 480px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  z-index: 99;
  .title {
    text-transform: uppercase;
    font-size: 16px;
    line-height: 20px;
    padding: 10px 20px;
    border-bottom: 1px solid #eeeeee;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  children,
  onConfirm,
  onCancel,
  title,
  isLoading,
  buttonConfirmContent,
  header = true,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <>
      <StyledRGB />
      <StyledPopup>
        {header && (
          <div className="title">
            {title && <span>{title}</span>}
            <span
              onClick={() => (onCancel ? onCancel() : onConfirm())}
              className="cursor-pointer"
            >
              <Icon name="close-icon" />
            </span>
          </div>
        )}

        <div className="px-4 py-5">
          {children}
          <div className="d-flex aign-items-center mt-5 justify-content-center">
            {onCancel && (
              <div className="mr-3">
                <button
                  className="button button-outline py-3 px-5"
                  onClick={onCancel}
                  type="button"
                >
                  {t.backTo}
                </button>
              </div>
            )}

            <button
              className="button button-primary py-3 px-5"
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {buttonConfirmContent || t.agree}
            </button>
          </div>
        </div>
      </StyledPopup>
    </>
  );
};

export default ConfirmPopup;
