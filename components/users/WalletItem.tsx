import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border: 1px solid #c2c2c2;
  margin-bottom: 16px;
  border-radius: 0.5rem;
  &:last-child {
    margin-bottom: 0;
  }
  .title {
    font-size: 16px;
  }
  @media only screen and (max-width: 1199px) {
    padding: 10px;
    .title {
      font-size: 14px;
    }
  }
`;
interface StyledStatusWalletProps {
  color: string;
}
const StyledStatusWallet = styled.p<StyledStatusWalletProps>`
  color: ${(props) => props.color};
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  text-align: right;
  @media only screen and (max-width: 1199px) {
    font-size: 11px;
    font-weight: 500;
  }
`;

interface WalletProps {
  status: number;
  time: string;
  title: string;
  amount: number;
  type: number;
}
const Wallet: React.FC<WalletProps> = ({
  status,
  time,
  title,
  amount,
  type,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const StatusWallet = [
    {
      title: t.pendingConfirm,
      color: '#FED02C',
      images: 'pending',
    },
    {
      title: t.success,
      color: '#15A268',
      images: 'success',
    },
    {
      title: t.failed,
      color: '#FE564B',
      images: 'error',
    },
    {
      title: t.confirmed,
      color: '#0066CC',
      images: 'confirmed',
    },
  ];

  return (
    <StyledWrap>
      <div className="d-flex align-items-center">
        <p className="mb-0 mr-3">
          <img src={`/svg/wallet_${StatusWallet[status].images}.svg`} alt="" />
        </p>
        <div>
          <p className="mbt-2">{title}</p>
          <p className="text-[#858585] font-size14 mb-0">{time}</p>
          {/* <span className="text-blue2 ml-2">Đến trang sản phẩm</span> */}
        </div>
      </div>
      <div>
        {/* <StyledStatus type={status}>
        {status === 'success'
          ? 'Thành công'
          : status === 'error'
          ? 'Không thành công'
          : 'Chờ xác nhận'}
      </StyledStatus> */}
        <StyledStatusWallet color={StatusWallet[status].color}>
          {StatusWallet[status].title}
        </StyledStatusWallet>
        <div className="text-right font-size20 d-flex justify-content-end">
          <div className="heading-04 mrt-1">
            {`${type === 1 ? '+' : '-'}${amount}`}
          </div>
          <Icon name="coin-small" size={16} />
        </div>
      </div>
    </StyledWrap>
  );
};

export default Wallet;
