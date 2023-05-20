import en from 'locales/en';
import vn from 'locales/vn';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ReactCodeInput = dynamic(import('react-code-input'));
const props = {
  className: 'reactCodeInput',
  inputStyle: {
    margin: '4px',
    width: '60px',
    borderRadius: '8px',
    fontSize: '20px',
    height: '50px',
    // paddingLeft: '7px',
    backgroundColor: '#fff',
    border: '1px solid #CCCCCC',
  },
  inputStyleInvalid: {
    margin: '4px',
    width: '60px',
    borderRadius: '8px',
    fontSize: '20px',
    height: '50px',
    // paddingLeft: '7px',
    backgroundColor: '#fff',
    border: '1px solid #F44336',
  },
};

const StyledWrap = styled.div`
  .reactCodeInput {
    input {
      text-align: center;
    }
  }
`;

interface OTPFormForm {
  phone: string;
  isEmail: boolean;
  isPinCodeValid?: boolean;
  pinCode?: string;
  handlePinChange?: (value: string) => void;
  checkPinCode: () => void;
  requestNewCode: () => void;
  isLoading?: boolean;
  error?: string;
}

const OTPForm: React.FC<OTPFormForm> = ({
  phone,
  isEmail,
  isPinCodeValid,
  pinCode,
  handlePinChange,
  checkPinCode,
  requestNewCode,
  isLoading,
  error,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [countDown, setCountDown] = useState(120);
  const countdownFunction = () => {
    setCountDown((state) => (state > 1 ? state - 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(countdownFunction, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledWrap>
      <div>
        <div>
          {t.OptCodeSend} {isEmail ? 'email' : t.phoneNumber}&nbsp;
          <b>*******{phone.substring(phone.length - 3, phone.length)}</b> .
        </div>
        <div className="d-flex mt-5 mb-5 justify-content-center">
          <ReactCodeInput
            inputMode="tel"
            name=""
            type="password"
            isValid={isPinCodeValid}
            fields={4}
            onChange={handlePinChange}
            value={pinCode}
            autoFocus
            {...props}
          />
        </div>

        {error && (
          <div className="text-red mt-2 font-size13 text-center">{error}</div>
        )}
        <div className="mt-5 text-center">
          <button
            className={countDown > 0 ? 'text-gray2' : ''}
            type="button"
            onClick={() => {
              setCountDown(60);
              requestNewCode();
            }}
            disabled={countDown > 0}
          >
            {t.resendCode}
          </button>
          <span>{` (${countDown}s)`}</span>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="button"
            className="button button-primary py-4 px-5 w-100"
            onClick={checkPinCode}
            disabled={(pinCode ?? '').length !== 4 || isLoading}
          >
            {isLoading ? t.inprogress : t.confirm}
          </button>
        </div>
      </div>
    </StyledWrap>
  );
};

export default OTPForm;
