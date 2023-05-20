import React from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Modal from 'components/Modal';
import Button, { EButtonStyleType } from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TChargeCoinModalProps } from './ChargeCoinModal.types';

const ChargeCoinModal: React.FC<TChargeCoinModalProps> = ({
  visible,
  onClose,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

  return (
    <Modal
      className="ChargeCoinModal"
      visible={visible}
      onClose={onClose}
      width={600}
      title="NẠP TIỀN VÀO VÍ"
    >
      <div className="ChargeCoinModal-wrapper">
        <div className="ChargeCoinModal-trans-id">
          Mã giao dịch: <span>#123456789</span>
        </div>
        <div className="ChargeCoinModal-badge d-flex align-items-center">
          <Icon name={EIconName.CheckCircle} color={EIconColor.FOREST_GREEN} />
          THANH TOÁN THÀNH CÔNG
        </div>

        <div className="ChargeCoinModal-group">
          <div className="ChargeCoinModal-row d-flex align-items-center justify-content-between">
            <div className="ChargeCoinModal-row-text">Số tiền</div>
            <div className="ChargeCoinModal-row-text">
              <strong>120.000 đ</strong>
            </div>
          </div>
          <div className="ChargeCoinModal-row d-flex align-items-center justify-content-between">
            <div className="ChargeCoinModal-row-text">Số xu</div>
            <div className="ChargeCoinModal-row-text d-flex align-items-center">
              <strong>12</strong>
              <Icon name={EIconName.ShopdiCoin} color={EIconColor.WHITE} />
            </div>
          </div>
          <div className="ChargeCoinModal-row d-flex align-items-center justify-content-between">
            <div className="ChargeCoinModal-row-text">Thời gian</div>
            <div className="ChargeCoinModal-row-text">
              <strong>09:20 - 24/03/2022</strong>
            </div>
          </div>
          <div className="ChargeCoinModal-row d-flex align-items-center justify-content-between">
            <div className="ChargeCoinModal-row-text">Hình thức nạp tiền</div>
            <div className="ChargeCoinModal-row-text">
              <strong>Chuyển khoản ngân hàng</strong>
            </div>
          </div>
        </div>

        <div className="ChargeCoinModal-submit">
          <Row gutter={isMobile ? [16, 16] : [24, 24]}>
            <Col span={12}>
              <Button
                title="Quay về trang chủ"
                size="large"
                styleType={EButtonStyleType.OUTLINE_BLACK}
              />
            </Col>
            <Col span={12}>
              <Button title="Nạp thêm" primary size="large" />
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default ChargeCoinModal;
