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

const ReturnPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const router = useRouter();

  const dataOrdersStatusOptions = [
    {
      key: 'success',
      title: 'YÊU CẦU HOÀN/TRẢ THÀNH CÔNG',
      icon: EIconName.CheckCircleShopdi,
    },
    {
      key: 'cancel',
      title: 'ĐÃ HỦY',
      icon: EIconName.WarningCircleShopdi,
      buttonAction: {
        title: 'Mua lại',
      },
    },
    {
      key: 'inprogress',
      title: 'ĐANG XỬ LÝ',
      icon: EIconName.ClockShopdi,
      buttonAction: {
        title: 'Yêu Cầu Hoàn Trả',
      },
    },
    {
      key: 'failed',
      title: 'YÊU CẦU HOÀN/TRẢ THẤT BẠI',
      icon: EIconName.WarningCircleShopdi,
      buttonAction: {
        title: 'Yêu Cầu Hoàn Trả',
        disabled: true,
      },
    },
  ];

  const renderOrdersProductsList = (): React.ReactElement => (
    <div className="ReturnPage-main">
      <div className="ReturnPage-search">
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
          suffixSubButtonProps={
            group.buttonAction
              ? {
                  size: 'small',
                  styleType: EButtonStyleType.OUTLINE_BLACK,
                  primary: false,
                  ...group.buttonAction,
                }
              : undefined
          }
          suffixButtonProps={{
            title: 'Chi Tiết Đơn',
            size: 'small',
            onClick: (): void => {
              router.push(Paths.OrderDetail('id'));
            },
          }}
        >
          <div className="ReturnPage-list-wrapper">
            <div className="ReturnPage-list">
              {[1, 2].map((item) => (
                <div className="ReturnPage-list-item d-flex align-items-center">
                  <div className="ReturnPage-list-item-image">
                    <Image
                      src="/img/image-product.png"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="ReturnPage-list-item-info">
                    <div className="ReturnPage-list-item-info-subtitle">
                      Louis Vuitton
                    </div>
                    <div className="ReturnPage-list-item-info-title">
                      Đồng hồ Tambour Slim Bloom ULess dsadsad
                    </div>
                  </div>

                  <div className="ReturnPage-list-item-price">
                    <del>186.040.000 đ</del>
                    <br />
                    <strong>146.040.000 đ</strong>
                  </div>

                  <div className="ReturnPage-list-item-amount">
                    <strong>x1</strong>
                  </div>
                  <div className="ReturnPage-list-item-total">
                    <strong>146.040.000 đ</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="ReturnPage-list-footer d-flex justify-content-end">
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
      title: 'Tất Cả',
      children: renderOrdersProductsList(),
    },
    {
      key: 'success',
      title: 'Đổi Trả Thành Công',
      children: renderOrdersProductsList(),
    },
    {
      key: 'failed',
      title: 'Đổi Trả Thất Bại',
      children: renderOrdersProductsList(),
    },
    {
      key: 'inprogress',
      title: 'Đang Xử Lý Đổi Trả',
      children: renderOrdersProductsList(),
    },
  ];

  return (
    <GuestLayout>
      <UserLayout>
        <div className="ReturnPage">
          <MyCoinCard />

          <div className="ReturnPage-title">ĐƠN HÀNG CỦA TÔI</div>

          <Tabs
            styleType={ETabStyleType.RECTANGLE}
            data={dataTabsHistoryOptions}
          />
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default ReturnPage;
