import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import UserNavigation from 'containers/UserNavigation';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import Button, { EButtonStyleType } from 'components/Button';

import { TUserLayoutProps } from './UserLayoutLayout.types';

const UserLayout: React.FC<TUserLayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);

  const handleOpenVisibleUserMenu = (): void => {
    setVisibleUserMenu(true);
  };

  const handleCloseVisibleUserMenu = (): void => {
    setVisibleUserMenu(false);
  };

  useEffect(() => {
    setVisibleUserMenu(false);
  }, [isMobile]);

  return (
    <div className="UserLayout">
      <div className="container">
        <div className="UserLayout-wrapper">
          <Row gutter={[24, 24]}>
            <Col xl={{ span: 8 }} lg={{ span: 7 }} span={24}>
              {isMobile && (
                <div
                  className="UserLayout-menu-btn d-flex"
                  onClick={handleOpenVisibleUserMenu}
                >
                  Hiện thanh điều hướng
                </div>
              )}
              {isMobile ? (
                <UserNavigation
                  visible={visibleUserMenu}
                  onClose={handleCloseVisibleUserMenu}
                />
              ) : (
                <UserNavigation />
              )}
            </Col>
            <Col xl={{ span: 16 }} lg={{ span: 17 }} span={24}>
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
