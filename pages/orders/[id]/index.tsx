import React, { useState } from 'react';

import GuestLayout from 'layouts/GuestLayout';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import Link from 'next/link';
import { Paths } from 'routers';
import Button, { EButtonStyleType } from 'components/Button';
import { Col, Row } from 'antd';
import AddressCard from 'components/AddressCard';
import Image from 'next/image';
import CancelOrderModal from 'containers/CancelOrderModal';

const OrderDetailPage: React.FC = () => {
  const [cancelOrderModalState, setCancelOrderModalState] = useState<{
    visible: boolean;
  }>({ visible: false });

  const handleOpenModalCancelOrder = (): void => {
    setCancelOrderModalState({ visible: true });
  };
  const handleCloseModalCancelOrder = (): void => {
    setCancelOrderModalState({ visible: false });
  };

  return (
    <GuestLayout>
      <div className="OrderDetailPage">
        <div className="container">
          <div className="OrderDetailPage-wrapper">
            <Link href={Paths.Orders} passHref>
              <div className="OrderDetailPage-back d-flex align-items-center">
                <Icon name={EIconName.AngleLeft} color={EIconColor.SHARK} />
                Quay lại
              </div>
            </Link>

            <div className="OrderDetailPage-header d-flex align-items-center justify-content-between">
              <div className="OrderDetailPage-header-item">
                <div className="OrderDetailPage-header-title">
                  ĐƠN HÀNG CỦA TÔI
                </div>
                <div className="OrderDetailPage-header-description d-flex align-items-center">
                  Đã giao
                  <span />
                  Mã đơn: #455555904
                  <span />
                  Ngày đặt: 14:21 22/03/2022
                </div>
              </div>
              <div className="OrderDetailPage-header-item">
                <Link href={Paths.OrderTracking('id')} passHref>
                  <Button
                    size="small"
                    title="Theo dõi đơn hàng"
                    styleType={EButtonStyleType.OUTLINE_BLACK}
                  />
                </Link>
              </div>
            </div>

            <div className="OrderDetailPage-info">
              <Row gutter={[24, 24]}>
                <Col lg={{ span: 8 }} span={24}>
                  <AddressCard
                    headerTitle="ĐỊA CHỈ NGƯỜI NHẬN"
                    name="Nguyễn Thanh Hiếu"
                    phoneNumber="032424475"
                    address="50 Quang Trung, Phường xyz, Quận abc, Thành phố qwe, 700000, Việt Nam"
                    preview
                    email="hieunguyenn0001@gmail.com"
                  />
                </Col>
                <Col lg={{ span: 8 }} span={24}>
                  <AddressCard
                    headerTitle="PHƯƠNG THỨC VẬN CHUYỂN"
                    name="Giao nhanh"
                    phoneNumber="24.200 đ"
                    address="Thứ 2, 18/09 - Thứ 4, 20/09"
                    preview
                  />
                </Col>
                <Col lg={{ span: 8 }} span={24}>
                  <AddressCard
                    headerTitle="PHƯƠNG THỨC THANH TOÁN"
                    name="Thanh toán khi nhận hàng"
                    address="Trạng thái: Thanh toán thành công"
                    preview
                  />
                </Col>
              </Row>
            </div>

            <AddressCard
              headerTitle="SẢN PHẨM"
              suffixSubButtonProps={{
                size: 'small',
                styleType: EButtonStyleType.OUTLINE_BLACK,
                primary: false,
                title: 'Huỷ Đơn Hàng',
                onClick: handleOpenModalCancelOrder,
              }}
              suffixButtonProps={{
                title: 'Mua lại',
                size: 'small',
              }}
            >
              <div className="OrderDetailPage-list-wrapper">
                <div className="OrderDetailPage-list">
                  {[1, 2].map(() => (
                    <div className="OrderDetailPage-list-item d-flex align-items-center">
                      <div className="OrderDetailPage-list-item-image">
                        <Image
                          src="/img/image-product.png"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>

                      <div className="OrderDetailPage-list-item-info">
                        <div className="OrderDetailPage-list-item-info-subtitle">
                          Louis Vuitton
                        </div>
                        <div className="OrderDetailPage-list-item-info-title">
                          Đồng hồ Tambour Slim Bloom ULess dsadsad
                        </div>
                      </div>

                      <div className="OrderDetailPage-list-item-price">
                        <del>186.040.000 đ</del>
                        <br />
                        <strong>146.040.000 đ</strong>
                      </div>

                      <div className="OrderDetailPage-list-item-amount">
                        <strong>x1</strong>
                      </div>
                      <div className="OrderDetailPage-list-item-total">
                        <strong>146.040.000 đ</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="OrderDetailPage-list-footer">
                  <div className="OrderDetailPage-list-footer-row d-flex align-items-center justify-content-between">
                    <div className="OrderDetailPage-list-footer-text">
                      Tạm tính
                    </div>
                    <div className="OrderDetailPage-list-footer-text">
                      <strong>292.080.000 đ</strong>
                    </div>
                  </div>

                  <div className="OrderDetailPage-list-footer-row d-flex align-items-center justify-content-between">
                    <div className="OrderDetailPage-list-footer-text">
                      Phí vận chuyển
                    </div>
                    <div className="OrderDetailPage-list-footer-text">
                      <strong>30.000 đ</strong>
                    </div>
                  </div>

                  <div className="OrderDetailPage-list-footer-row d-flex align-items-center justify-content-between">
                    <div className="OrderDetailPage-list-footer-text">
                      Tổng cộng
                    </div>
                    <div className="OrderDetailPage-list-footer-text">
                      <span>292.080.000 đ</span>
                      <br />
                      <small>(Đã bao gồm VAT nếu có)</small>
                    </div>
                  </div>
                </div>
              </div>
            </AddressCard>
          </div>
        </div>

        <CancelOrderModal
          {...cancelOrderModalState}
          onClose={handleCloseModalCancelOrder}
        />
      </div>
    </GuestLayout>
  );
};

export default OrderDetailPage;
