import React, { useEffect } from 'react';
import HeaderLogOut from 'components/layout/header/HeaderLogOut';
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import { useCookies } from 'react-cookie';
import BiddingBarBottom from 'containers/home/components/BiddingBarBottom';

interface LayoutProps {
  children: React.ReactNode;
  isLogout?: boolean;
  hideHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isLogout, hideHeader }) => {
  const [cookies, setCookie] = useCookies(['token']);
  useEffect(() => {
    const currentToken = localStorage.getItem('_u');
    if (currentToken && currentToken?.length < 10) {
      return;
    }
    setCookie('token', currentToken, {
      path: '/',
    });
  }, []);
  return (
    <>
      {/* <Header /> */}
      {!hideHeader && <div>{isLogout ? <HeaderLogOut /> : <Header />}</div>}
      <main
        className="main__content"
        style={{ minHeight: 'calc(100vh - 485px)' }}
      >
        {children}
      </main>
      <BiddingBarBottom />
      <Footer />
    </>
  );
};

export default Layout;
