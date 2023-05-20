/* eslint-disable jsx-a11y/alt-text */

import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { storePrevPath } from 'redux/action/authth';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();

  return (
    <header>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-4">
          <div className="d-flex align-items-center">
            <Link href="/">
              <a title="shopdi" onClick={() => dispatch(storePrevPath(''))}>
                <img
                  style={{ maxHeight: 50 }}
                  src="/svg/logo.svg"
                  alt="shopdi"
                />
              </a>
            </Link>
            {/* <div className="style-login">
              {router.pathname === '/login'
                ? 'ĐĂNG NHẬP'
                : router.pathname === '/register'
                ? 'ĐĂNG KÝ'
                : router.pathname === '/forgot-pin'
                ? 'QUÊN MÃ PIN'
                : 'QUÊN MẬT KHẨU'}
            </div> */}
          </div>
          <div className="style-help">
            <Link href="/huong-dan/">
              <a title="help" className="headline-04 text-blue">
                {t.headerHelp}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
