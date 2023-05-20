import React from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import GuestLayout from 'layouts/GuestLayout';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import Link from 'next/link';
import { Paths } from 'routers';
import { Col, Row } from 'antd';
import AddressCard from 'components/AddressCard';
import ProductHorizontal from 'components/ProductHorizontal';

const TrackingPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

  const dataTracking = [
    {
      title: 'Giao hàng thành công',
      description: '',
      dateTime: '11:08, Thứ sáu 10-06-2022',
    },
    {
      title: 'Đang vận chuyển',
      description:
        'Giao hàng không thành công lần 1 [Lý do: Không thể liên lạc được chủ nhà]',
      dateTime: '08:59, Thứ sáu 10-06-2022',
    },
    {
      title: 'Đang vận chuyển',
      description: 'Đang trên đường giao hàng',
      dateTime: '08:59, Thứ sáu 10-06-2022',
    },
    {
      title: 'Đang vận chuyển',
      description:
        'Đơn hàng đang được lưu kho giao hàng [Quận Hà Đông, Hà Nội]',
      dateTime: '08:59, Thứ sáu 10-06-2022',
    },
    {
      title: 'Đang xử lý',
      description: 'Lấy hàng thành công',
      dateTime: '10:51, Thứ ba 07-06-2022',
    },
    {
      title: 'Chờ xác nhận',
      description: 'Chờ Shopdi xác nhận',
      dateTime: '10:51, Thứ ba 07-06-2022',
    },
  ];

  return (
    <GuestLayout>
      <div className="TrackingPage">
        <div className="container">
          <div className="TrackingPage-wrapper">
            <Link href={Paths.OrderDetail('id')} passHref>
              <div className="TrackingPage-back d-flex align-items-center">
                <Icon name={EIconName.AngleLeft} color={EIconColor.SHARK} />
                Quay lại
              </div>
            </Link>

            <div className="TrackingPage-header d-flex align-items-center justify-content-between">
              <div className="TrackingPage-header-item">
                <div className="TrackingPage-header-title">
                  THEO DÕI ĐƠN HÀNG
                </div>
                <div className="TrackingPage-header-description d-flex align-items-center">
                  Mã đơn: #455555904
                  <span />
                  Ngày đặt: 14:21 22/03/2022
                </div>
              </div>
            </div>

            <div className="TrackingPage-main">
              <Row gutter={[24, 24]}>
                <Col lg={{ span: 14 }} span={24}>
                  <AddressCard
                    headerTitle={
                      <div className="TrackingPage-card-header">
                        <div className="TrackingPage-card-header-title">
                          GIAO HÀNG THÀNH CÔNG
                        </div>
                        <div className="TrackingPage-card-header-description">
                          Được giao bởi Ahamove
                        </div>
                      </div>
                    }
                  >
                    <div className="TrackingPage-progress">
                      {dataTracking.map((item, index) => (
                        <div
                          className={classNames('TrackingPage-progress-item', {
                            active: index === 0,
                          })}
                        >
                          <div className="TrackingPage-progress-item-title">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="TrackingPage-progress-item-description">
                              {item.description}
                            </div>
                          )}
                          <div className="TrackingPage-progress-item-description">
                            11:08, Thứ sáu 10-06-2022
                          </div>
                        </div>
                      ))}
                    </div>
                  </AddressCard>
                </Col>
                <Col lg={{ span: 10 }} span={24}>
                  <div className="TrackingPage-header-title">ĐƠN HÀNG</div>
                  <div className="TrackingPage-products">
                    {[1, 2, 3].map((item) => (
                      <ProductHorizontal
                        key={item}
                        subtitle="Louis Vuitton"
                        title="Đồng hồ Tambour Slim Bloom ULess dsadsad"
                        price="146.040.000 đ"
                        description="Số lượng: x1"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default TrackingPage;
