import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { Col, Row } from 'antd';
import classNames from 'classnames';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import MyCoinCard from 'components/MyCoinCard';
import Input from 'components/Input';
import { EIconColor, EIconName } from 'components/Icon';
import Button from 'components/Button';
import DeliveryCard from 'components/DeliveryCard';
import { Paths } from 'routers';

const ChargeCoinPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
  const [chargeCoinValue, setChargeCoinValue] = useState<string>('');

  const dataChargeCoinMethods = [
    {
      title: 'Blockchain Voucher',
      description: 'Thanh toán bằng Blockchain voucher',
      iconName: EIconName.PaymentTicket,
      iconColor: EIconColor.SHARK,
    },
    {
      title: 'Visa/Master',
      description: 'Thanh toán bằng thẻ VISA/ MasterCard',
      iconName: EIconName.PaymentCard,
      iconColor: EIconColor.SHARK,
    },
    {
      title: 'Ví điện tử',
      description: 'Thanh toán bằng ví Momo, ví VNPay...',
      iconName: EIconName.PaymentWallet,
      iconColor: EIconColor.SHARK,
    },
    {
      title: 'Chuyển khoản',
      description: 'Nạp tiền thông qua chuyển khoản',
      iconName: EIconName.PaymentTransfer,
      iconColor: EIconColor.SHARK,
    },
  ];

  return (
    <GuestLayout>
      <UserLayout>
        <div className="ChargeCoinPage">
          <MyCoinCard />

          <div className="ChargeCoinPage-title">NẠP XU</div>
          <div className="ChargeCoinPage-add-coin-form">
            <Input
              size="large"
              placeholder="Nhập Số Xu"
              value={chargeCoinValue}
              onChange={setChargeCoinValue}
            />
          </div>

          <div className="ChargeCoinPage-list">
            <Row gutter={[12, 12]}>
              {[20, 50, 100, 200, 500, 1000, 2000, 5000].map((item) => (
                <Col key={item} sm={{ span: 6 }} span={12}>
                  <div
                    className={classNames('ChargeCoinPage-list-item', {
                      active: String(item) === chargeCoinValue,
                    })}
                  >
                    {item}
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div className="ChargeCoinPage-title">HÌNH THỨC NẠP XU</div>
          <div className="ChargeCoinPage-method">
            {dataChargeCoinMethods.map((item) => (
              <DeliveryCard {...item} />
            ))}
          </div>

          <div className="ChargeCoinPage-submit d-flex justify-content-end">
            <Link href={Paths.ChargeCoinTransferInformation} passHref>
              <Button title="Nạp Xu" size="large" primary />
            </Link>
          </div>
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default ChargeCoinPage;
