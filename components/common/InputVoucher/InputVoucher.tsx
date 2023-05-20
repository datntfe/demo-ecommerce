import React from 'react';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import Icon from '../Icon';

interface InputVoucherProps {
  onClick: () => void;
  isLoading?: boolean;
  setVoucherCode: (e: string) => void;
}

const InputVoucher: React.FC<InputVoucherProps> = ({
  onClick,
  isLoading,
  setVoucherCode,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <div className="input-voucher">
      <div>
        <Icon name="coupon" />
      </div>
      <input
        placeholder="Nhập mã voucher"
        onChange={(e) => setVoucherCode(e.target.value)}
      />
      <button
        type="button"
        className="button button-primary px-5 flex-shrink-0 size-l text-orange"
        disabled={isLoading}
        onClick={onClick}
      >
        {t.confirm}
      </button>
    </div>
  );
};

export default InputVoucher;
