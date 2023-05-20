import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Col, Row } from 'antd';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import MyCoinCard from 'components/MyCoinCard';
import ReviewModal from 'containers/ReviewModal';
import VoucherBox from 'components/VoucherBox';
import Input from 'components/Input';
import Icon, { EIconName } from 'components/Icon';
import Button from 'components/Button';
import Tabs, { ETabStyleType } from 'components/Tabs';
import Select from 'components/Select';
import HistoryPaymentCard from 'components/HistoryPaymentCard';
import DatePicker from 'components/DatePicker';

const WalletPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

  const dataTabsWalletOptions = [
    {
      key: 'all',
      title: 'Đổi Voucher',
      children: (
        <>
          <div className="WalletPage-add-voucher">
            <div className="WalletPage-add-voucher-header d-flex align-items-center justify-content-between">
              <div className="WalletPage-title">MÃ VOUCHER</div>
              <div className="WalletPage-buy-voucher">Mua Voucher</div>
            </div>
            <div className="WalletPage-add-voucher-form d-flex">
              <Input
                prefix={<Icon name={EIconName.TicketShopdi} />}
                size="large"
                placeholder="Nhập mã Voucher"
                noAffixBorder
              />
              <Button primary title="Xác nhận" size="large" />
            </div>
          </div>

          <div className="WalletPage-title">DANH SÁCH VOUCHER</div>

          <div className="WalletPage-list">
            <Row gutter={isMobile ? [16, 16] : [24, 24]}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                <Col xl={{ span: 6 }} lg={{ span: 8 }} span={12}>
                  <VoucherBox />
                </Col>
              ))}
            </Row>
          </div>

          <div className="WalletPage-warning">
            [*] Voucher chỉ được chuyển một lần và không thể đổi từ Xu sang
            Voucher
          </div>
        </>
      ),
    },
    {
      key: 'success',
      title: 'Lịch Sử Chi Tiêu',
      children: (
        <>
          <div className="WalletPage-filter">
            <Row gutter={isMobile ? [16, 16] : [24, 24]}>
              <Col sm={{ span: 6 }} span={24}>
                <Select placeholder="Chọn dữ liệu" />
              </Col>
              <Col sm={{ span: 6 }} span={24}>
                <Select placeholder="Chọn dữ liệu" />
              </Col>
              <Col sm={{ span: 6 }} span={24}>
                <DatePicker placeholder="Chọn ngày" />
              </Col>
            </Row>
          </div>

          <div className="WalletPage-history-group">
            <div className="WalletPage-history-group-title">Tháng 5</div>
            <div className="WalletPage-history-group-list">
              {[1, 2, 3, 4, 5].map(() => (
                <HistoryPaymentCard />
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      key: 'failed',
      title: 'Hướng Dẫn Nạp Tiền',
      children: <></>,
    },
    {
      key: 'inprogress',
      title: 'Quy Chế Nạp Shopdi Xu',
      children: <></>,
    },
  ];

  return (
    <GuestLayout>
      <UserLayout>
        <div className="WalletPage">
          <MyCoinCard />

          <Tabs
            styleType={ETabStyleType.RECTANGLE}
            data={dataTabsWalletOptions}
          />
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default WalletPage;
