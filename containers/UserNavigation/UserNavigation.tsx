/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Collapse } from 'antd';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import AddressCard from 'components/AddressCard';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import Drawer from 'components/Drawer';
import { Paths } from 'routers';

import { TUserNavigationProps } from './UserNavigation.types';

const { Panel } = Collapse;

const UserNavigation: React.FC<TUserNavigationProps> = ({
  visible,
  onClose,
}) => {
  const isDrawerStyle = typeof visible === 'boolean';
  const router = useRouter();

  const dataNavigationOptions = [
    {
      key: 'myAccount',
      activePaths: [Paths.Profile, Paths.Address, Paths.Password],
      navTitle: 'HỒ SƠ CÁ NHÂN',
      title: 'Tài khoản của tôi',
      icon: EIconName.MapPointShopdi,
      children: [
        {
          key: 'profile',
          link: Paths.Profile,
          activePaths: [Paths.Profile],
          title: 'Hồ sơ',
        },
        {
          key: 'address',
          link: Paths.Address,
          activePaths: [Paths.Address],
          title: 'Địa chỉ',
        },
        {
          key: 'password',
          link: Paths.Password,
          activePaths: [Paths.Password],
          title: 'Đổi mật khẩu',
        },
      ],
    },
    {
      key: 'shopdiCoin',
      activePaths: [
        Paths.Wallet,
        Paths.ChargeCoin,
        Paths.TransferCoin,
        Paths.ChargeCoinTransferInformation,
      ],
      link: Paths.Wallet,
      navTitle: 'SHOPDI COIN',
      title: 'Shopdi Xu',
      icon: EIconName.ShopdiCoin,
      children: [],
    },
    {
      key: 'history',
      activePaths: [Paths.History],
      link: Paths.History,
      navTitle: 'LỊCH SỬ MUA HÀNG',
      title: 'Lịch sử',
      icon: EIconName.ClockShopdi,
      children: [],
    },
    {
      key: 'order',
      activePaths: [Paths.Orders],
      link: Paths.Orders,
      navTitle: 'ĐƠN HÀNG CỦA TÔI',
      title: 'Đơn hàng',
      icon: EIconName.OrderShopdi,
      children: [],
    },
    {
      key: 'returnManagement',
      activePaths: [Paths.Return],
      link: Paths.Return,
      navTitle: 'QUẢN LÝ ĐỔI TRẢ',
      title: 'Quản lý đổi trả',
      icon: EIconName.BoxShopdi,
      children: [],
    },
    {
      key: 'notification',
      activePaths: [Paths.Notifications],
      link: Paths.Notifications,
      navTitle: 'THÔNG BÁO',
      title: 'Thông báo',
      icon: EIconName.NotificationShopdi,
      children: [],
    },
    {
      key: 'review',
      activePaths: [Paths.Reviews],
      link: Paths.Reviews,
      navTitle: 'ĐÁNH GIÁ',
      title: 'Đánh giá của tôi',
      icon: EIconName.StarShopdi,
      children: [],
    },
    {
      key: 'refer',
      activePaths: [],
      navTitle: 'GIỚI THIỆU',
      title: 'Giới thiệu bạn mới',
      icon: EIconName.ReferShopdi,
      children: [],
    },
  ];

  const activeOptions = dataNavigationOptions.find((option) =>
    option.activePaths.includes(router.pathname),
  );

  const handleNavigate = (data: any): void => {
    if (data.link) {
      router.push(data.link);
    }
  };

  const renderUserNavigationWrapper = (): React.ReactElement => (
    <div className="UserNavigation-wrapper">
      <AddressCard headerTitle={activeOptions?.navTitle} radius>
        <Collapse
          defaultActiveKey={activeOptions?.key || ''}
          expandIcon={(): React.ReactElement => (
            <Icon name={EIconName.AngleDown} color={EIconColor.EBONY_CLAY} />
          )}
          expandIconPosition="right"
        >
          {dataNavigationOptions.map((item) => {
            const isEmpty = item.children.length === 0;

            return (
              <Panel
                className={classNames({ 'UserNavigation-empty': isEmpty })}
                disabled={!item.link && isEmpty}
                key={item.key}
                header={
                  <div className="UserNavigation-header">
                    <div
                      className={classNames(
                        'UserNavigation-item d-flex align-items-center',
                        {
                          active: item.activePaths.includes(router.pathname),
                        },
                      )}
                      onClick={(): void => handleNavigate(item)}
                    >
                      <Icon name={item.icon} />
                      <span>{item.title}</span>
                    </div>
                  </div>
                }
              >
                {isEmpty ? (
                  <></>
                ) : (
                  <div className="UserNavigation-body">
                    {item.children.map((subItem) => (
                      <div
                        className={classNames(
                          'UserNavigation-item d-flex align-items-center',
                          {
                            active: subItem.activePaths.includes(
                              router.pathname,
                            ),
                          },
                        )}
                        onClick={(): void => handleNavigate(subItem)}
                      >
                        <span>{subItem.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            );
          })}
        </Collapse>
      </AddressCard>
    </div>
  );

  return isDrawerStyle ? (
    <Drawer
      className="UserNavigation UserNavigationDrawer"
      visible={visible}
      onClose={onClose}
      placement="left"
    >
      {renderUserNavigationWrapper()}
    </Drawer>
  ) : (
    <div className="UserNavigation">{renderUserNavigationWrapper()}</div>
  );
};

export default UserNavigation;
