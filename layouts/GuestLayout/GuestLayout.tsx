import React from 'react';

import Header from 'containers/Header';
import Footer from 'containers/Footer';
import ScrollToTop from 'components/ScrollToTop';

import { TGuestLayoutProps } from './GuestLayoutLayout.types';

const GuestLayout: React.FC<TGuestLayoutProps> = ({ children }) => (
  <div className="GuestLayout">
    <ScrollToTop />
    <div className="GuestLayout-header">
      <Header />
    </div>
    <div className="GuestLayout-body">{children}</div>
    <div className="GuestLayout-footer">
      <Footer />
    </div>
  </div>
);

export default GuestLayout;
