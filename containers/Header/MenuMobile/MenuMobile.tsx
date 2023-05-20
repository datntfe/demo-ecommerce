import React from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';

import Icon, { EIconColor, EIconName } from 'components/Icon';
import Input from 'components/Input';
import Drawer from 'components/Drawer';

import { dataHeaderCategory } from 'containers/Header/Header.data';
import { TMenuMobileProps } from './MenuMobile.types';

const MenuMobile: React.FC<TMenuMobileProps> = ({ visible, onClose }) => (
  <Drawer
    className="MenuMobile"
    visible={visible}
    onClose={onClose}
    placement="bottom"
  >
    <div className="MenuMobile-wrapper">
      <div className="Header-search">
        <Input
          placeholder="Tìm kiếm sản phẩm ..."
          noAffixBorder
          prefix={<Icon name={EIconName.SearchShopdi} />}
        />
      </div>

      <div className="MenuMobile-title">Danh mục</div>
      <ul className="MenuMobile-list d-flex flex-wrap">
        {dataHeaderCategory.map((item) => (
          <li className="MenuMobile-list-item">
            <Link href={item.link} passHref>
              <a className="Header-text" draggable="false">
                {item.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="MenuMobile-title">Dịch vụ</div>
      <ul className="MenuMobile-list">
        <li className="MenuMobile-list-item">
          <Link href="#" passHref>
            <a className="Header-text">Chọn ngôn ngữ</a>
          </Link>
        </li>
        <li className="MenuMobile-list-item">
          <Link href="#" passHref>
            <a className="Header-text">Hỗ trợ</a>
          </Link>
        </li>
        <li className="MenuMobile-list-item">
          <Link href="#" passHref>
            <a className="Header-text">
              Hotline: <strong>1900 6789</strong>
            </a>
          </Link>
        </li>
      </ul>

      <div className="MenuMobile-title">Download App</div>
      <Row gutter={[16, 16]}>
        <Col>
          <Link href="#" passHref>
            <a className="Header-download">
              <Icon name={EIconName.Ios} color={EIconColor.EBONY_CLAY} />
            </a>
          </Link>
        </Col>
        <Col>
          <Link href="#" passHref>
            <a className="Header-download">
              <Icon name={EIconName.Android} color={EIconColor.EBONY_CLAY} />
            </a>
          </Link>
        </Col>
      </Row>
    </div>
  </Drawer>
);

export default MenuMobile;
