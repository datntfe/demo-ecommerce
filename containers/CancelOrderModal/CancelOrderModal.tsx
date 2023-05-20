import React from 'react';
import { Col, Form, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Modal from 'components/Modal';
import Button, { EButtonStyleType } from 'components/Button';
import Select from 'components/Select';
import TextArea from 'components/TextArea';

import { TCancelOrderModalProps } from './CancelOrderModal.types';

const CancelOrderModal: React.FC<TCancelOrderModalProps> = ({
  visible,
  onClose,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [form] = Form.useForm();

  return (
    <Modal
      className="CancelOrderModal"
      visible={visible}
      onClose={onClose}
      width={648}
      title="LÝ DO HỦY ĐƠN HÀNG"
    >
      <div className="CancelOrderModal-wrapper">
        <div className="CancelOrderModal-text">#123456789</div>
        <div className="CancelOrderModal-warning">
          Mã giảm giá và ưu đãi sẽ không còn hiệu lực cho đơn hàng tiếp theo.
          Quý khách vui lòng cân nhắc kỹ trước khi thực hiện hủy đơn hàng.
        </div>
        <Form layout="vertical" form={form}>
          <Form.Item name="reason">
            <Select placeholder="Chọn lý do hủy" size="large" options={[]} />
          </Form.Item>
          <Form.Item name="memo">
            <TextArea
              placeholder="Nhập lý do khác"
              maxLength={120}
              showCount
              size="large"
            />
          </Form.Item>
          <div className="CancelOrderModal-submit">
            <Row gutter={isMobile ? [16, 16] : [24, 24]}>
              <Col span={12}>
                <Button
                  title="Huỷ"
                  size="large"
                  styleType={EButtonStyleType.OUTLINE_BLACK}
                />
              </Col>
              <Col span={12}>
                <Button title="Xác nhận" primary size="large" />
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CancelOrderModal;
