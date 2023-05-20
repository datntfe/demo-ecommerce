import Icon from 'components/common/Icon';
import React from 'react';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

export const Coupon = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <div className="coupond mb-3">
      <div>
        <Icon name="coupon" />
      </div>
      <input placeholder={t.inputCoupon} />
      <div className="apply">{t.apply}</div>
    </div>
  );
};

export default Coupon;
