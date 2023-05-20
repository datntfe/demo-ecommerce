import React from 'react';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import MyCoinCard from 'components/MyCoinCard';
import Tabs, { ETabStyleType } from 'components/Tabs';
import ProductHorizontal from 'components/ProductHorizontal';

const HistoryPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  const renderHistoryProductsList = (): React.ReactElement => (
    <div className="HistoryPage-list">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <ProductHorizontal
          subtitle="Louis Vuitton"
          title="IPhone 13 Chính hãng / màu trắng / 512 Gb"
          price="146.040.000đ"
          description={
            <>
              Đã mua với giá <span className="hightlight">CƠ BẢN</span> -
              20/03/2022 13:11
            </>
          }
        />
      ))}
    </div>
  );

  const dataTabsHistoryOptions = [
    {
      key: 'buyed',
      title: 'Đã từng mua',
      children: renderHistoryProductsList(),
    },
    {
      key: 'seenPrice',
      title: 'Đã từng xem giá',
      children: renderHistoryProductsList(),
    },
    {
      key: 'deposit',
      title: 'Đã từng đặt cọc',
      children: renderHistoryProductsList(),
    },
  ];

  return (
    <GuestLayout>
      <UserLayout>
        <div className="HistoryPage">
          <MyCoinCard />

          <div className="HistoryPage-title">LỊCH SỬ</div>

          <Tabs
            styleType={ETabStyleType.RECTANGLE}
            data={dataTabsHistoryOptions}
          />
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default HistoryPage;
