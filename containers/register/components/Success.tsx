import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';

interface SuccessProps {
  isRegister: boolean;
  onBack: () => void;
}

const Success: React.FC<SuccessProps> = ({ isRegister, onBack }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="mb-4">
        <Icon name="regis-success" />
      </div>
      <div className="text-center mb-3 font-size22">
        <br /> {isRegister ? t.regisSuccess : t.changePasswordSuccess}
      </div>
      {isRegister ? (
        <div className="text-center">{t.benefitLogin}</div>
      ) : (
        <div className="text-center">{t.changePasswordAlert}</div>
      )}

      <button type="button" className="button-login mb-5" onClick={onBack}>
        {/* {isRegister ? 'Tìm hiểu SHOPDI ngay!' : 'Về trang chủ Shopdi'} */}
        {t.login}
      </button>
    </div>
  );
};

export default Success;
