import React, { useState } from 'react';
import { Col, Row } from 'antd';
import classNames from 'classnames';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import MyCoinCard from 'components/MyCoinCard';
import Input from 'components/Input';
import Button from 'components/Button';
import ChargeCoinModal from 'containers/ChargeCoinModal';

const TransferCoinPage: React.FC = () => {
  const [chargeCoinModalState, setChargeCoinModalState] = useState<{
    visible: boolean;
  }>({ visible: false });
  const [chargeCoinValue, setChargeCoinValue] = useState<string>('');

  const handleOpenChargeCoinModal = (): void => {
    setChargeCoinModalState({ visible: true });
  };

  const handleCloseChargeCoinModal = (): void => {
    setChargeCoinModalState({ visible: false });
  };

  return (
    <GuestLayout>
      <UserLayout>
        <div className="TransferCoinPage">
          <MyCoinCard />

          <Row gutter={[24, 24]}>
            <Col>
              <div className="TransferCoinPage-title">
                SỐ ĐIỆN THOẠI NGƯỜI NHẬN
              </div>
              <div className="TransferCoinPage-add-coin-form">
                <Input size="large" placeholder="Nhập Số Điện Thoại" />
              </div>
            </Col>
            <Col>
              <div className="TransferCoinPage-title">SỐ XU CẦN CHUYỂN</div>
              <div className="TransferCoinPage-add-coin-form">
                <Input
                  size="large"
                  placeholder="Nhập Số Xu"
                  value={chargeCoinValue}
                  onChange={setChargeCoinValue}
                />
              </div>
            </Col>
          </Row>

          <div className="TransferCoinPage-list">
            <Row gutter={[12, 12]}>
              {[20, 50, 100, 200, 500, 1000, 2000, 5000].map((item) => (
                <Col key={item} sm={{ span: 6 }} span={12}>
                  <div
                    className={classNames('TransferCoinPage-list-item', {
                      active: String(item) === chargeCoinValue,
                    })}
                  >
                    {item}
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div className="TransferCoinPage-submit d-flex justify-content-end">
            <Button
              title="Xác nhận chuyển xu"
              size="large"
              primary
              onClick={handleOpenChargeCoinModal}
            />
          </div>

          <ChargeCoinModal
            {...chargeCoinModalState}
            onClose={handleCloseChargeCoinModal}
          />
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default TransferCoinPage;
