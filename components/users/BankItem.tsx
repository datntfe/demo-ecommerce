import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledItemBank = styled.div`
  padding: 15px 20px;
  border: 1px solid #cccccc;
  .border-bottom {
    border-bottom: 1px solid #eeeeee;
  }
  margin-bottom: 20px;
`;

interface BankItemProps {
  bankNumber: string;
  bankName: string;
  bankAccount: string;
}

const BankItem: React.FC<BankItemProps> = ({
  bankNumber,
  bankName,
  bankAccount,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const textAreaRef = useRef<HTMLSpanElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopied = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.innerText;
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
    }
  };

  useEffect(() => {
    let timeOut: any = 0;
    if (copySuccess) {
      timeOut = setTimeout(() => {
        setCopySuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timeOut);
  }, [copySuccess]);

  return (
    <StyledItemBank>
      <div className="order-id mb-4">
        <div className="font-bold">
          <span>{t.bankNumber} - </span>
          <span ref={textAreaRef}>{bankNumber}</span>
        </div>
        {copySuccess ? (
          <div>
            <Icon name="check-circle" />
            <span className="text-blue2 font-size11 ml-1">{t.copied}</span>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={handleCopied}>
            <Icon name="copy-blue" />
          </div>
        )}
      </div>
      <div className="py-3 border-bottom">
        <span className="text-gray3 mr-5">{t.bank}</span>
        <span className="font-bold">{bankName}</span>
      </div>
      <div className="py-3">
        <span className="text-gray3 mr-5">{t.bankName}</span>
        <span className="font-bold">{bankAccount}</span>
      </div>
    </StyledItemBank>
  );
};
export default BankItem;
