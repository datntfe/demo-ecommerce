import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledPopup = styled.div`
  min-width: 560px;
  background: ${theme.white};
  border-radius: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  z-index: 99;
  padding: 20px;
  .reactCodeInput {
    input {
      text-align: center;
    }
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

interface ChangePassSuccessProps {
  onClose: () => void;
}
const ChangePassSuccess: React.FC<ChangePassSuccessProps> = ({ onClose }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <>
      <StyledRGB />
      <StyledPopup>
        <div>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <span className="cursor-pointer" onClick={onClose}>
              <Icon name="close-icon" />
            </span>
          </div>
          <div className="mb-4 d-flex justify-content-center">
            <img src="/svg/successIcon.svg" alt="atl" />
          </div>
          <div className="text-center font-size16 font-bold mb-5">
            {t.changePassSuccess}
          </div>
          <div
            className="font-size16 text-center text-gray3 cursor-pointer"
            onClick={onClose}
          >
            <b>{t.close}</b>
          </div>
        </div>
      </StyledPopup>
    </>
  );
};

export default ChangePassSuccess;
