import React from 'react';
import { Col, Row } from 'antd';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Icon, { EIconName } from 'components/Icon';
import Button from 'components/Button';
import Voucher from 'components/Voucher';

import { TVoucherModalProps } from './VoucherModal.types';

const VoucherModal: React.FC<TVoucherModalProps> = ({ visible, onClose }) => (
  <Modal
    className="VoucherModal"
    visible={visible}
    onClose={onClose}
    width={797}
    title="MÃ KHUYẾN MÃI"
  >
    <div className="VoucherModal-wrapper">
      <div className="VoucherModal-form d-flex align-items-center justify-content-between">
        <Input
          prefix={<Icon name={EIconName.TicketShopdi} />}
          placeholder="Nhập mã khuyến mãi"
          size="large"
          noAffixBorder
        />
        <Button primary title="Áp dụng" size="large" />
      </div>

      <div className="VoucherModal-list">
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Col key={item} md={{ span: 12 }} span={24}>
              <div className="VoucherModal-list-item">
                <Voucher disabled={item % 4 === 0} />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="VoucherModal-submit">
        <Button primary title="Chọn" size="large" />
      </div>
    </div>
  </Modal>
);

export default VoucherModal;
