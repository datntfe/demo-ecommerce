import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import React from 'react';

export const BannerWallet = () => {
  const profile = useSelector((state: RootState) => state.user.profile);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <div className="wallet-view">
      <div className="d-flex align-items-center">
        <Icon name="coin-small" size={55} />
        <div className="mlt-5">
          <div className="text-white">ID:&nbsp;{profile?.walletCode}</div>
          <div className="big-title-2 text-white">
            {profile?.point ?? 0}
            <span className="ml-1"> {t.coin}</span>
          </div>
        </div>
      </div>
      {/* <div className="d-flex align-items-center">
        <button
          type="button"
          onClick={() => router.push('/user/wallet/deposit')}
          className="mr-3"
        >
          {t.depositCoin}
        </button>
        <button
          type="button"
          onClick={() => router.push('/user/wallet/transfer')}
        >
          {t.transferCoin}
        </button>
      </div> */}
    </div>
  );
};
