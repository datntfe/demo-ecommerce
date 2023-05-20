import Icon from 'components/common/Icon';
import InputVoucher from 'components/common/InputVoucher/InputVoucher';
import { BannerWallet } from 'components/users/BannerWallet';
import LeftSide from 'components/users/LeftSide';
import { VoucherItem } from 'components/users/VoucherItem';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { claimVouchers, getVouchers, receivedCoin } from 'redux/action/wallet';
import { RootState } from 'redux/reducer';
import { checkVouchersServices, claimVoucherServices } from 'services/wallet';
import styled from 'styled-components';

const StyledWrapInner = styled.div`
  .wallet {
    background: #fffbeb;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    align-items: center;
  }
`;

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 25px;
    .title {
      border-bottom: 1px solid #c2c2c2;
      padding: 10px 0;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
    }
  }
`;

const activeMenu = '6-4';
const Voucher = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile);
  const voucherList = useSelector((state: RootState) => state.wallet.vouchers);
  const isLoadingList = useSelector(
    (state: RootState) => state.wallet.isLoadings.vouchers,
  );
  const isLoadingClaim = useSelector(
    (state: RootState) => state.wallet.isLoadings.claimVoucher,
  );
  const [error, setError] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [isLoadingApply, setIsLoadingApply] = useState(false);

  useEffect(() => {
    dispatch(getVouchers({ pageIndex: 1, pageSize: 100 }));
  }, [dispatch]);

  const onClaim = (code: string, amount: number) => {
    dispatch(claimVouchers(code, amount));
  };

  const handleApply = async () => {
    setIsLoadingApply(true);
    try {
      const data = await checkVouchersServices(voucherCode);
      if (!data.data.status) {
        toast.error(data.data.message);
      } else {
        const applyResult = await claimVoucherServices(voucherCode);
        if (applyResult.data.status) {
          toast.success(t.applyVoucherSuccess);
          dispatch(receivedCoin(data.data.data.amount));
          setVoucherCode('');
        }
      }
      setIsLoadingApply(false);
    } catch (error) {
      toast.error(t.hasError);
      setIsLoadingApply(false);
    }
  };

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile transfer-page">
        <LeftSide activeMenu={activeMenu} />
        <div className="right-side" id="voucher">
          <div className="headline-01 text-uppercase title mb-3">VOUCHER</div>
          <StyledWrapInner>
            <BannerWallet />
            <div className="d-flex mbt-3">
              <div className="heading-04 mr-5 text-uppercase">
                {t.inputVoucher}
              </div>
              {/* <div className="ml-5">
                <Link href="/">
                  <a className="text-blue">Mua Voucher</a>
                </Link>
              </div> */}
            </div>
            <div className="mb-5" style={{ width: '400px' }}>
              <InputVoucher
                setVoucherCode={(e) => setVoucherCode(e)}
                isLoading={voucherCode === '' || isLoadingApply}
                onClick={handleApply}
              />
            </div>
            {error && <div className="text-red">{error}</div>}
            <div className="heading-04 mb-5">{t.voucherList} </div>
            {!isLoadingList && voucherList.data.length === 0 ? (
              <div
                className="d-flex justify-content-center flex-column align-items-center"
                style={{ minHeight: '300px' }}
              >
                {' '}
                <Icon name="coupon" size={50} />
                <div>{t.emptyVoucher}</div>
              </div>
            ) : (
              <div
                className="d-flex flex-wrap align-items-baseline"
                style={{ minHeight: '300px' }}
              >
                {voucherList.data.map((item) => (
                  <VoucherItem
                    key={item.code}
                    code={item.code}
                    amount={item.amount}
                    endTime={item.expiredDate}
                    onClaim={onClaim}
                    isLoading={isLoadingClaim}
                  />
                ))}
              </div>
            )}

            <div className="text-red">[*]{t.hintVoucher}</div>
          </StyledWrapInner>
        </div>
      </StyledWrap>
    </div>
  );
};

export default Voucher;
