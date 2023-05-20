import React, { useRef } from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

const StyledOrderSuccess = styled.div`
  width: 100%;
  background-color: #e3edff;
  padding: 80px 0;
  min-height: 700px;
  .title {
    font-weight: 700;
    font-size: 48px;
    line-height: 60px;
    margin-top: 20px;
  }
  .styledFrame {
    background: rgba(41, 114, 254, 0.05);
    border-radius: 8px;
    margin-top: 10px;
    padding: 15px;
    max-width: 520px;
  }
  .icon-bg {
    position: relative;
    right: 0;
    top: 0;
  }
  .bg-logo {
    background: url('/svg/logo-bg.svg') top right no-repeat;
  }
`;

const Result = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const status = router.query.Status;
  const orderId = router.query.ServiceOrderId;
  const textAreaRef = useRef<HTMLSpanElement>(null);
  const handleCopied = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.innerText;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <StyledOrderSuccess>
      <div className="container bg-logo">
        <div>
          {status && (
            <Icon name={status === '00' ? 'success-tick-big' : 'alert-icon'} />
          )}
        </div>

        <div style={{ minHeight: '60px' }}>
          {status && (
            <div className="title text-uppercase" style={{ minHeight: '80px' }}>
              {t.deposit}
              {status === '00' ? t.success : t.failed}
            </div>
          )}
        </div>

        {/* <div>
          Thời gian nạp <span className="text-blue2">Thứ 2, 18/09 - Thứ 4, 20/09</span>
        </div> */}
        <div className="font-size12 mt-3 mb-3">{t.orderId}:</div>
        <div className="d-flex align-items-center">
          <button
            type="button"
            onClick={handleCopied}
            className="px-5 py-3 button button-outline"
          >
            <span className="mr-3" ref={textAreaRef}>
              {orderId}
            </span>

            <Icon name="copy" />
          </button>

          <button
            type="button"
            className="px-5 py-3 button-primary"
            onClick={() => router.push('/user/wallet')}
          >
            {t.backtoAccount}
          </button>
        </div>
      </div>
    </StyledOrderSuccess>
  );
};

export default Result;
