import React from 'react';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import MyCoinCard from 'components/MyCoinCard';
import Tabs, { ETabStyleType } from 'components/Tabs';
import ProductHorizontal from 'components/ProductHorizontal';
import AddressCard from 'components/AddressCard';
import { EButtonStyleType } from 'components/Button';

const NotificationsPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  const renderHistoryProductsList = (): React.ReactElement => (
    <AddressCard
      headerTitle="CẬP NHẬT ĐƠN HÀNG"
      suffixButtonProps={{ title: 'Đánh dấu đã xem tất cả' }}
    >
      <div className="NotificationsPage-list">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProductHorizontal
            title={
              <>
                <strong>GIAO HÀNG THÀNH CÔNG</strong>
                <br />
                Kiện hàng <strong>AELGNLKSM</strong> của đơn hàng{' '}
                <strong>LAKDNOAIA</strong> đã được giao thành công đến bạn.
              </>
            }
            description="06/04/2022 04:13"
            buttonProps={{
              title: 'Xem chi tiết',
              styleType: EButtonStyleType.OUTLINE_BLACK,
              primary: false,
            }}
          />
        ))}
      </div>
    </AddressCard>
  );

  const dataTabsHistoryOptions = [
    {
      key: 'updateOrder',
      title: 'Cập nhật đơn hàng',
      total: 2,
      children: renderHistoryProductsList(),
    },
    {
      key: 'discount',
      title: 'Khuyến mãi',
      children: renderHistoryProductsList(),
    },
    {
      key: 'fromShopdi',
      title: 'Từ shopdi',
      children: renderHistoryProductsList(),
    },
  ];

  return (
    <GuestLayout>
      <UserLayout>
        <div className="NotificationsPage">
          <MyCoinCard />

          <div className="NotificationsPage-title">THÔNG BÁO</div>

          <Tabs
            styleType={ETabStyleType.RECTANGLE}
            data={dataTabsHistoryOptions}
          />
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default NotificationsPage;
