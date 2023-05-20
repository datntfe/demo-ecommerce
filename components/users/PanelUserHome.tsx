/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
import Icon from 'components/common/Icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';
import theme from 'styles/theme';
import { CheckLoggedUser } from 'utils/Auth';

const StyledPannel = styled.div`
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  background-color: ${theme.white};
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 100%;
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94px;
    height: 94px;
    img {
      vertical-align: middle;
      width: 94px;
      height: 94px;
      border-radius: 50%;
    }
  }
  .text-name {
    font-size: 16px;
    line-height: 30px;
    span {
      font-weight: 700;
    }
  }
  .text-coin {
    margin-top: 10px;
    span {
      font-weight: 700;
    }
    .coin {
      position: relative;
      top: -2px;
      right: -2px;
    }
  }
  .text-discount {
    margin-top: 10px;
    font-weight: 700;
    color: ${theme.orange};
    text-align: center;
    margin-bottom: 10px;
  }
  .line {
    width: 100%;
    border-bottom: ${`1px solid ${theme.text_gray4}`};
    padding: 10px 0;
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: ${theme.text};
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

const PanelUserHome: React.FC<PropsFromRedux> = (props) => {
  const { name, coin, avatar, user } = props;
  const [isGuest, setIsGuest] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsGuest(!CheckLoggedUser());
  }, [user]);

  // console.log('user', user);

  const { profile } = user;

  const renderGuest = () => (
    <>
      <img alt="" src="img/mascot 1.png" />
      <div className="text-coin">
        Đăng nhập để nhận ngay <span>{12}</span>
        <span className="coin">
          <Icon name="coin-small" size={16} />
        </span>
      </div>
      <div className="mt-3">
        <button
          style={{ border: '1px solid #D69A00', width: '105px' }}
          className="btn text-white font-size13"
          onClick={() => router.push('/login')}
        >
          Đăng nhập
        </button>
        <button
          className="btn outline text-orange font-size13 ml-2"
          style={{ width: '105px' }}
          onClick={() => router.push('/register')}
        >
          Đăng ký
        </button>
      </div>
    </>
  );
  const renderLogged = () => (
    <>
      <div className="avatar">
        <Link href="/user/account/profile/">
          <a>
            <img src={profile?.avatar || 'svg/avatar.svg'} alt="avt" />
          </a>
        </Link>
      </div>
      <div className="text-name">
        Xin chào,
        <Link href="/user/account/profile/">
          <a>
            <span>{profile?.name ?? profile?.phone}</span>
          </a>
        </Link>
      </div>
      <div className="text-coin">
        Bạn đang có <span>{profile?.point ?? 0}</span>
        <span className="coin">
          <Icon name="coin-small" size={16} />
        </span>
      </div>
    </>
  );

  return (
    <StyledPannel>
      {isGuest ? renderGuest() : renderLogged()}

      {/* <div className="text-discount">
        Ưu đãi độc quyền đối với
        <br /> thành viên Shopdi
      </div> */}
      <div className="line">
        <Link href="/">
          <a>
            <div className="d-flex align-items-center">
              <Icon name="panel-user-1" />
              <div className="ml-2">
                Ưu đãi khi mua hàng với
                <br /> Shopdi Xu giảm đến 70%
              </div>
            </div>

            <Icon name="arrow-right-16" />
          </a>
        </Link>
      </div>
      <div className="line">
        <Link href="/">
          <a>
            <div className="d-flex align-items-center">
              <Icon name="panel-user-2" />
              <div className="ml-2">
                Bảo vệ người mua và mua
                <br /> sắm không cần lo lắng
              </div>
            </div>

            <Icon name="arrow-right-16" />
          </a>
        </Link>
      </div>
      <div className="line">
        <Link href="/">
          <a>
            <div className="d-flex align-items-center">
              <Icon name="panel-user-3" />
              <div className="ml-2">
                Hỗ trợ thanh toán với
                <br /> Shopdi Xu
                <br />
                {/* An toàn - Minh bạch */}
              </div>
            </div>

            <Icon name="arrow-right-16" />
          </a>
        </Link>
      </div>
      <div className="line">
        <Link href="/">
          <a>
            <div className="d-flex align-items-center">
              <Icon name="panel-user-4" />
              <div className="ml-2">
                Sử dụng các tính năng bán <br />
                hàng thông minh nhất
              </div>
            </div>

            <Icon name="arrow-right-16" />
          </a>
        </Link>
      </div>
    </StyledPannel>
  );
};

interface PanelUserHomeProps {
  name?: string;
  coin?: number;
  avatar?: string;
}

const mapStateToProps = (state: RootState, ownProps: PanelUserHomeProps) =>
  // orderBy
  ({
    ...ownProps,
    user: state.user,
  });
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PanelUserHome);
