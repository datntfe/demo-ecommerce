/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import Icon from 'components/common/Icon';
import LoginPopup from 'components/common/loginPopup';
import NumberAlert from 'components/common/NumberAlert';
import SearchBox from 'components/layout/header/components/SearchBox';
import AddToCart from 'components/purchase/AddToCart';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { logOut, setStateLoginPopup } from 'redux/action/user';
import { RootState } from 'redux/reducer';
import useOnClickOutside from 'utils/useClickOutSide';

const Header: React.FC<PropsFromRedux> = (props) => {
  const { suggest, cart, systemStatus, user } = props;
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const popupLogin = useSelector(
    (state: RootState) => state.user.stateLoginPopup,
  );
  const [showLogout, setShowLogout] = useState(false);
  const refOutSide = useRef(null);
  useOnClickOutside(refOutSide, () => setShowLogout(false));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
    localStorage.setItem('locale', locale === 'en' ? 'en' : 'vi');
  };

  return (
    <header>
      {popupLogin && (
        <LoginPopup
          loginSuccessProps={() => dispatch(setStateLoginPopup(false))}
          onClose={() => dispatch(setStateLoginPopup(false))}
        />
      )}
      <div className="top">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="body-04 mr-2">{t.selectLanguage}</div>
              <select
                onChange={changeLanguage}
                defaultValue={locale}
                id="gender"
              >
                <option className="body-04" value="vn">
                  🇻🇳
                </option>
                <option className="body-04" value="en">
                  🇺🇸
                </option>
              </select>
              <div className="header-line-vertical" />
              <Link href="https://sellercenter.shopdi.com.vn/customer/account/create/">
                <a title="shopdi" className="hover-color body-04">
                  {t.sellerChannel}
                </a>
              </Link>
              <div className="header-line-vertical" />

              <Link href="https://www.facebook.com/shopdi.io">
                <a title="shopdi" className="hover-color body-04">
                  {t.headerConnect}
                </a>
              </Link>
              <div className="header-line-vertical" />
              <Link href="tel:19003395" rel="noopener noreferrer">
                <a title="shopdi" className="font-bold hover-color">
                  <span className="body-04">{t.headerContact}:</span>&nbsp;
                  <span className="text-phone body-04">
                    <b>19003395</b>
                  </span>
                </a>
              </Link>
            </div>
            {/* <div>Khuyến mãi 27% khi mua lần đầu, Mua sắm ngay!</div> */}
            {/* <div className="d-flex align-items-center">
              <div className="mr-3 mt-1">Download App</div>
              <div className="app-download">
                <Link href="/">
                  <a className="mr-3">
                    <Icon name="android" />
                  </a>
                </Link>
                <div className="app-download-qr">
                  <QRCodeSVG value="https://apps.apple.com/app/shopdi/id1625578140" />
                </div>
              </div>
              <div className="app-download">
                <Link href="/">
                  <a>
                    <Icon name="apple" />
                  </a>
                </Link>
                <div className="app-download-qr">
                  <QRCodeSVG value="https://play.google.com/store/apps/details?id=io.shopdi.app" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center logo-header">
              <Link href="/">
                <a title="shopdi">
                  <img
                    style={{ maxHeight: 50 }}
                    src="/img/logo.png"
                    alt="shopdi"
                  />
                </a>
              </Link>
              {/* <div className="text-uppercase ml-5">thương hiệu</div>
              <div className="text-uppercase ml-4">CỘNG ĐỒNG</div> */}
            </div>
            <SearchBox />
            <div className="d-flex align-items-center">
              {/* <div className="cart-icon" onClick={() => router.push('/user/notification/')}>
                <Icon name="bell" color="#000" />
                {systemStatus && systemStatus.unreadNotificaitionCount > 0 && (
                  <NumberAlert qty={systemStatus.unreadNotificaitionCount} />
                )}
              </div> */}

              <div
                className="cart-icon hover-opacity"
                onClick={() =>
                  user?.userId
                    ? router.push('/cart')
                    : dispatch(setStateLoginPopup(true))
                }
              >
                <img src="/img/cart.png" alt="shopdi" />

                {(systemStatus?.productInCart > 0 ||
                  systemStatus?.productInDeposit > 0) && (
                  <NumberAlert
                    qty={
                      systemStatus.productInCart + systemStatus.productInDeposit
                    }
                  />
                )}

                {cart && <AddToCart />}
              </div>

              {user?.userId ? (
                <div
                  className="cart-icon user-login d-flex align-items-center"
                  ref={refOutSide}
                >
                  <div
                    className="avatar"
                    onClick={() => router.push('/user/account/profile')}
                  >
                    <img
                      src={
                        user?.avatar !== '' ? user?.avatar : '/svg/avatar.svg'
                      }
                    />
                  </div>
                  <div onClick={() => setShowLogout(true)}>
                    <Icon name="arrow-bottom-solid" />
                  </div>
                  {showLogout && (
                    <div className="log-out">
                      <div className="item">
                        <Link href="/user/account/profile">
                          <a>{t.headerInfo}</a>
                        </Link>
                      </div>
                      <div className="item">
                        <Link href="/user/purchase/">
                          <a>{t.headerOrder}</a>
                        </Link>
                      </div>
                      <div className="item">
                        <Link href="/user/wallet/">
                          <a>{t.headerWallet}</a>
                        </Link>
                      </div>

                      <div className="item" onClick={handleLogout}>
                        <a>{t.headerLogout}</a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="cart-icon hover-opacity"
                  onClick={() => dispatch(setStateLoginPopup(true))}
                >
                  <Icon name="pure-user" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export interface HeaderComponentProps {
  data?: any;
  isLogged?: boolean;
}
const mapStateToProps = (state: RootState, ownProps: HeaderComponentProps) => ({
  ...ownProps,
  cdnHost: process.env.prefixCdn,
  suggest: state.homePage.suggest,
  cart: state.cart.isAddCart,
  systemStatus: state.user.systemStatus,
  user: state.user.profile,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Header);
