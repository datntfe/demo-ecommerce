import Link from 'next/link';
import React from 'react';
import { formatCash } from 'utils';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';
import Icon from '../Icon';

interface FixedWalletProps {
  point: number;
}
const FixedWallet: React.FC<FixedWalletProps> = ({ point }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <div className="fixed-label">
      <div className="top">
        {/* <div className="text-orange cursor-pointer" onClick={() => router.push('https://help.shopdi.vn')}>
              Hướng dẫn
            </div> */}
        <div className="px-2">
          <div className="text-gray3">{t.yourCoin}</div>
          <div className="coin d-flex align-items-center justify-content-center">
            <span> {formatCash(point)}</span>
            <span className="mb-1 ml-1">
              <Icon name="coin-small" size={22} />
            </span>
          </div>
        </div>

        <button type="button" className="button button-primary w-100 py-3 mt-2">
          <Link href="/user/wallet/deposit">
            <a className="text-white">{t.depositCoin}</a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FixedWallet;
