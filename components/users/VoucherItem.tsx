import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';

interface VoucherItemProps {
  code: string;
  amount: number;
  endTime: string;
  isLoading?: boolean;
  onClaim: (id: string, amount: number) => void;
}
export const VoucherItem: React.FC<VoucherItemProps> = ({
  code,
  endTime,
  isLoading,
  onClaim,
  amount,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <div id="voucher-item">
      <div className="mb-2">
        <Icon name="coin-small" />
        &nbsp;
        <span>{amount}</span>
      </div>
      <div className="mb-2">
        {t.code}: {code}
      </div>
      <div className="mb-2">
        {t.expired}: {endTime}
      </div>
      {/* <div className="mb-2">Ngày đổi: {usedTime}</div> */}
      <button
        className="button button-primary w-100 py-2"
        type="button"
        disabled={isLoading}
        onClick={() => onClaim(code, amount)}
      >
        {t.exchangeVoucher}
      </button>
    </div>
  );
};
