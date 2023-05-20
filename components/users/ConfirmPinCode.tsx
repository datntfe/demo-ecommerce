import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const ReactCodeInput = dynamic(import('react-code-input'));

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

const props = {
  className: 'reactCodeInput',
  inputStyle: {
    margin: '4px',
    width: '74px',
    borderRadius: '20px',
    fontSize: '20px',
    height: '60px',
    backgroundColor: '#fff',
    border: '1px solid #FDD116',
  },
  inputStyleInvalid: {
    margin: '4px',
    width: '74px',
    borderRadius: '20px',
    fontSize: '20px',
    height: '60px',
    backgroundColor: '#fff',
    border: `1px solid ${theme.red}`,
  },
};
const CORRECT_PIN_CODE = '111222';

const ConfirmPinCode = () => {
  const [pinCode, setPinCode] = useState('');
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [btnIsPressed, setBtnIsPressed] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    setBtnIsPressed(false);
  };

  const checkPinCode = () => {
    const isPinCodeValid = pinCode === CORRECT_PIN_CODE;
    setBtnIsPressed(true);
    setIsPinCodeValid(isPinCodeValid);
    if (!isPinCodeValid) {
      setPinCode('');
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <StyledRGB />
      <StyledPopup>
        {success ? (
          <div>
            <div className="d-flex justify-content-end align-items-center mb-3">
              <span className="cursor-pointer">
                <Icon name="close-icon" />
              </span>
            </div>
            <div className="mb-4 d-flex justify-content-center">
              <img src="/svg/successIcon.svg" alt="t" />
            </div>
            <div className="text-center font-size16 font-bold mb-5">
              {t.changePassSuccess}
            </div>
            <div className="font-size16 text-center text-gray3 cursor-pointer">
              <b>{t.close}</b>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="font-size18">
                <b>{t.confirmCode}</b>
              </div>
              <span className="cursor-pointer">
                <Icon name="close-icon" />
              </span>
            </div>
            <div className="text-gray3 mb-5">{t.hintConfirmCode}</div>
            <div className="d-flex justify-content-center mb-3">
              <ReactCodeInput
                inputMode="tel"
                name=""
                type="password"
                isValid={isPinCodeValid}
                fields={6}
                onChange={handlePinChange}
                value={pinCode}
                autoFocus
                {...props}
              />
            </div>
            <div className="text-right mb-5">
              <Link href="/forgot-pin">
                <a className="text-blue2">{t.forgotPin}</a>
              </Link>
            </div>
            <button
              type="button"
              onClick={checkPinCode}
              className="py-4 px-5 button button-primary w-100"
            >
              {t.confirm}
            </button>
          </div>
        )}
      </StyledPopup>
    </>
  );
};

export default ConfirmPinCode;
