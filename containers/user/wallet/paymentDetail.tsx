import React from 'react';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';
import styled from 'styled-components';
import LeftSide from 'components/users/LeftSide';
import Icon from 'components/common/Icon';

const StyledSection = styled.div`
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  & .title-section {
    font-size: 20px;
    color: #d69a00;
    margin-left: 20px;
    font-weight: 700;
  }
  & .wrap-items {
    padding: 0px 20px;
  }
  .right {
    font-size: 20px;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: 810px;
  }
  .left-side {
    width: 280px;
    padding-right: 40px;
    .avatar {
      display: flex;
      width: 60px;
      height: 60px;
      justify-content: center;
      align-items: center;
      img {
        vertical-align: middle;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
  }
  .bg-gray4 {
    background: #eeeeee;
    border-radius: 10px;
  }
  .select {
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 8px;
    padding: 11px 10px;
    width: 105px;
  }
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .label {
    padding: 10px;
    background: #e6f5ed;
    border-radius: 8px;
  }
`;
const activeMenu = '6';

const PaymentDetailContainer = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <div className="container">
      <StyledWrap className=" d-flex">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="d-flex justify-content-between align-items-center mb-4 cursor-pointer">
            <div className="font-size16 font-bold">CHI TIẾT NẠP TIỀN</div>
          </div>

          <StyledSection>
            <div
              className="d-flex justify-content-between pb-4"
              style={{ borderBottom: '0.5px solid #EEEEEE' }}
            >
              <div>Nạp tiền vào ví</div>
              <div>
                <span className="text-gray3">Mã giao dịch:&nbsp;</span>
                <span className="text-blue">#123456789</span>
              </div>
            </div>
            <div className="label mt-5 mb-5">
              <Icon name="check-circle" />
              <span className="font-size12 ml-2 font-bold">Đã xác nhận</span>
            </div>
            <div className="d-flex mb-4">
              <div className="text-gray3 mr-5 col-lg-3">Số tiền</div>
              <div className="text-green col-lg-3">120.000 đ</div>
            </div>
            <div className="d-flex mb-4">
              <div className="text-gray3 mr-5 col-lg-3">Số Point</div>
              <div className="text-green col-lg-3">
                120 <Icon name="coin-small" size={14} />
              </div>
            </div>
            <div className="d-flex mb-4">
              <div className="text-gray3 mr-5 col-lg-3">Thời gian</div>
              <div className="col-lg-3 font-bold">09:20 - 24/03/2022</div>
            </div>
            <div className="d-flex mb-4">
              <div className="text-gray3 mr-5 col-lg-3">Hình thức nạp tiền</div>
              <div className="col-lg-3 font-bold">09:20 - 24/03/2022</div>
            </div>
          </StyledSection>
          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className="px-5 py-3 button button-primảy"
              onClick={() => router.push('/user/wallet/deposit')}
            >
              NẠP THÊM
            </button>
          </div>
        </div>
      </StyledWrap>
    </div>
  );
};

export default PaymentDetailContainer;
