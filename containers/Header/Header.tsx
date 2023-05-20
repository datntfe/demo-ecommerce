import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'antd';
import classNames from 'classnames';

import Avatar from 'components/Avatar';
import Carousels from 'components/Carousels';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import Input from 'components/Input';
import { dataHeaderCategory } from 'containers/Header/Header.data';
import MenuMobile from 'containers/Header/MenuMobile';

import { Paths } from 'routers';

const Header: React.FC = () => {
  const [isShowShadow, setIsShowShadow] = useState<boolean>(false);
  const [visibleMenuMobile, setVisibleMenuMobile] = useState<boolean>(false);

  const handleOpenMenuMobile = (): void => {
    setVisibleMenuMobile(true);
  };

  const handleCloseMenuMobile = (): void => {
    setVisibleMenuMobile(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) setIsShowShadow(true);
      else setIsShowShadow(false);
    });
  }, []);

  return (
    <header className={classNames('Header', { shadow: isShowShadow })}>
      <div className="Header-wrapper">
        <div className="Header-wrapper-item">
          <div className="container">
            <Row align="middle" justify="space-between">
              <Col>
                <Row gutter={[16, 16]} align="middle">
                  <Col>
                    <div className="Header-text">Chọn ngôn ngữ</div>
                  </Col>
                  <Col>
                    <div className="Header-line" />
                  </Col>
                  <Col>
                    <Link href="#" passHref>
                      <a className="Header-text">Hỗ trợ</a>
                    </Link>
                  </Col>
                  <Col>
                    <div className="Header-line" />
                  </Col>
                  <Col>
                    <Link href="tel: 19006789" passHref>
                      <a className="Header-text">
                        Hotline: <strong>1900 6789</strong>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row gutter={[16, 16]}>
                  <Col>
                    <div className="Header-text">Download App</div>
                  </Col>
                  <Col>
                    <Link href="#" passHref>
                      <a className="Header-download">
                        <Icon name={EIconName.Ios} color={EIconColor.WHITE} />
                      </a>
                    </Link>
                  </Col>
                  <Col>
                    <Link href="#" passHref>
                      <a className="Header-download">
                        <Icon
                          name={EIconName.Android}
                          color={EIconColor.WHITE}
                        />
                      </a>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className="Header-wrapper-item">
          <div className="container">
            <Row align="middle" justify="space-between">
              <Col>
                <Link href={Paths.Home} passHref>
                  <a className="Header-logo">
                    <Image src="/img/logo.svg" alt="" layout="fill" />
                  </a>
                </Link>
              </Col>
              <Col flex={1}>
                <Row gutter={[24, 24]} align="middle" justify="end">
                  <Col flex={1}>
                    <div className="Header-search">
                      <Input
                        placeholder="Tìm kiếm sản phẩm ..."
                        size="small"
                        noAffixBorder
                        prefix={<Icon name={EIconName.SearchShopdi} />}
                      />
                    </div>
                  </Col>
                  <Col>
                    <Link href={Paths.Cart} passHref>
                      <div className="Header-cart">
                        <div className="Header-cart-badge">2</div>
                        <Icon name={EIconName.ShopdiCart} />
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link href={Paths.Profile} passHref>
                      <div className="Header-account d-flex align-items-center cursor-pointer">
                        <Avatar size="2.4rem" border />
                        <Icon
                          name={EIconName.CaretDown}
                          color={EIconColor.BLACK}
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <div
                      className="Header-btn-menu"
                      onClick={handleOpenMenuMobile}
                    >
                      <Icon name={EIconName.Menu} color={EIconColor.WHITE} />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className="Header-wrapper-item">
          <div className="container">
            <div className="Header-carousel">
              <Carousels
                slidesToShow={8}
                slidesToScroll={2}
                infinite={false}
                dots={false}
                arrows
              >
                {dataHeaderCategory.map((item) => (
                  <div key={item.key} className="Header-carousel-item">
                    <Link href={item.link} passHref>
                      <a className="Header-text" draggable="false">
                        {item.title}
                      </a>
                    </Link>
                  </div>
                ))}
              </Carousels>
            </div>
          </div>
        </div>
      </div>

      <MenuMobile visible={visibleMenuMobile} onClose={handleCloseMenuMobile} />
    </header>
  );
};

export default Header;
