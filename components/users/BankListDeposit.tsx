import ButtonCopy from 'components/common/CopyButton';
import BankItem from 'components/users/BankItem';
import { BankAccountEntity } from 'interfaces/response/wallet';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { formatVietnamDong } from 'utils';

const StyledSectionInner = styled.div`
  height: 100%;
  background: #ffffff;
  padding: 30px 20px;
  .order-id {
    background: #f0f0f0;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 400px;
    @media only screen and (max-width: 1199px) {
      width: 100%;
    }
  }
`;

interface BankListDepositProps {
  orderCode: string;
  bankList: BankAccountEntity[];
  price: number;
  onFinished: () => void;
}
const BankListDeposit: React.FC<BankListDepositProps> = ({
  orderCode,
  bankList,
  price,
  onFinished,
}) => {
  const textAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <StyledSectionInner>
      <div className="text-gray2 mb-4 d-flex align-items-end mb-4">
        {t.amountTransfer}:
        <span className="ml-2 font-bold font-size20 mr-2">
          {formatVietnamDong(price * 1000)}
        </span>
      </div>

      <div className="font-bold mb-2">{t.transferNote}</div>
      <div className="text-gray3 mb-3">{t.hintTransfer}</div>
      <div className="order-id mb-4">
        <div className="font-bold" ref={textAreaRef}>
          {orderCode}
        </div>
        <ButtonCopy element={textAreaRef} />
      </div>
      <div className="font-bold mb-2">{t.receivedTransfer}</div>
      <div className="text-gray3 mb-3">{t.bankList}:</div>
      {bankList.map((item, index) => (
        <BankItem
          bankNumber={item.bankNumber}
          bankName={item.bankName}
          bankAccount={item.bankAccount}
          key={item.bankNumber + index}
        />
      ))}

      <div
        className="text-red font-size12 mb-3 mt-3"
        dangerouslySetInnerHTML={{ __html: t.noteBank }}
      />
      <div className="mb-3">{t.afterTransfer}</div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="px-4 py-3 button button-primary"
          onClick={onFinished}
        >
          {t.transferedSuccess}
        </button>
      </div>
    </StyledSectionInner>
  );
};

export default BankListDeposit;
