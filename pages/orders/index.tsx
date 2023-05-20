import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { useRouter } from 'next/router';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import MyCoinCard from 'components/MyCoinCard';
import Tabs, { ETabStyleType } from 'components/Tabs';
import Input from 'components/Input';
import Icon, { EIconName } from 'components/Icon';
import AddressCard from 'components/AddressCard';
import { EButtonStyleType } from 'components/Button';
import { Paths } from 'routers';

const OrdersPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const router = useRouter();

  const dataOrdersStatusOptions = [
    {
      key: 'success',
      title: 'ĐÃ GIAO',
      icon: EIconName.BoxShopdi,
      buttonAction: {
        title: 'Yêu Cầu Hoàn Trả',
      },
    },
    {
      key: 'waitPayment',
      title: 'CHỜ THANH TOÁN',
      icon: EIconName.Wallet,
      buttonAction: {
        title: 'Huỷ Đơn Hàng',
      },
    },
    {
      key: 'inprogress',
      title: 'ĐANG XỬ LÝ',
      icon: EIconName.ClockShopdi,
      buttonAction: {
        title: 'Huỷ Đơn Hàng',
      },
    },
    {
      key: 'inDelivery',
      title: 'ĐANG VẬN CHUYỂN',
      icon: EIconName.TruckShopdi,
      buttonAction: {
        title: 'Yêu Cầu Hoàn Trả',
        disabled: true,
      },
    },
    {
      key: 'cancel',
      title: 'ĐÃ HỦY',
      icon: EIconName.WarningCircleShopdi,
      buttonAction: {
        title: 'Mua Lại',
      },
    },
  ];

  const renderOrdersProductsList = (): React.ReactElement => (
    <div className="OrdersPage-main">
      <div className="OrdersPage-search">
        <Input
          placeholder="Tên shop, ID đơn hàng hoặc Tên sản phẩm"
          prefix={<Icon name={EIconName.SearchShopdi} />}
          noAffixBorder
          size="small"
        />
      </div>

      {dataOrdersStatusOptions.map((group) => (
        <AddressCard
          headerTitle={group.title}
          headerIcon={<Icon name={group.icon} />}
          suffixSubButtonProps={{
            size: 'small',
            styleType: EButtonStyleType.OUTLINE_BLACK,
            primary: false,
            ...group.buttonAction,
          }}
          suffixButtonProps={{
            title: 'Chi Tiết Đơn',
            size: 'small',
            onClick: (): void => {
              router.push(Paths.OrderDetail('id'));
            },
          }}
        >
          <div className="OrdersPage-list-wrapper">
            <div className="OrdersPage-list">
              {[1, 2].map((item) => (
                <div className="OrdersPage-list-item d-flex align-items-center">
                  <div className="OrdersPage-list-item-image">
                    <Image
                      src="/img/image-product.png"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="OrdersPage-list-item-info">
                    <div className="OrdersPage-list-item-info-subtitle">
                      Louis Vuitton
                    </div>
                    <div className="OrdersPage-list-item-info-title">
                      Đồng hồ Tambour Slim Bloom ULess dsadsad
                    </div>
                  </div>

                  <div className="OrdersPage-list-item-price">
                    <del>186.040.000 đ</del>
                    <br />
                    <strong>146.040.000 đ</strong>
                  </div>

                  <div className="OrdersPage-list-item-amount">
                    <strong>x1</strong>
                  </div>
                  <div className="OrdersPage-list-item-total">
                    <strong>146.040.000 đ</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="OrdersPage-list-footer d-flex justify-content-end">
              Tổng cộng: <strong>292.080.000 đ</strong>
            </div>
          </div>
        </AddressCard>
      ))}
    </div>
  );

  const dataTabsHistoryOptions = [
    {
      key: 'all',
      title: 'Tất cả',
      children: renderOrdersProductsList(),
    },
    {
      key: 'waitPayment',
      title: 'Chờ Thanh toán',
      children: renderOrdersProductsList(),
    },
    {
      key: 'inprogress',
      title: 'Đang xử lý',
      children: renderOrdersProductsList(),
    },
    {
      key: 'inDelivery',
      title: 'Đang vận chuyển',
      children: renderOrdersProductsList(),
    },
    {
      key: 'success',
      title: 'Đã giao',
      children: renderOrdersProductsList(),
    },
    {
      key: 'cancel',
      title: 'Đã hủy',
      children: renderOrdersProductsList(),
    },
  ];

  return (
    <GuestLayout>
      <UserLayout>
        <div className="OrdersPage">
          <MyCoinCard />

          <div className="OrdersPage-title">ĐƠN HÀNG CỦA TÔI</div>

          <Tabs
            styleType={ETabStyleType.RECTANGLE}
            data={dataTabsHistoryOptions}
          />
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default OrdersPage;
