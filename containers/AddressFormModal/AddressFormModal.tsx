import React from 'react';
import { Col, Form, Row } from 'antd';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import Button from 'components/Button';
import { validationRules } from 'utils/functions';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';

import { TAddressFormModalProps } from './AddressFormModal.types';

const AddressFormModal: React.FC<TAddressFormModalProps> = ({
  visible,
  onClose,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      className="AddressFormModal"
      visible={visible}
      onClose={onClose}
      width={830}
      title="THÊM ĐỊA CHỈ GIAO HÀNG"
    >
      <div className="AddressFormModal-wrapper">
        <Form form={form} layout="vertical">
          <Row gutter={[32, 32]}>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="lastName"
                label="Tên"
                required
                rules={[validationRules.required()]}
              >
                <Input placeholder="Nhập Tên" size="large" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="firstName"
                label="Họ"
                required
                rules={[validationRules.required()]}
              >
                <Input placeholder="Nhập Họ" size="large" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="phoneNumber"
                label="Số Điện Thoại"
                required
                rules={[validationRules.required()]}
              >
                <Input placeholder="Nhập Số Điện Thoại" size="large" numberic />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="email"
                label="Email"
                required
                rules={[validationRules.required(), validationRules.email()]}
              >
                <Input placeholder="Nhập Email" size="large" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" label="Số nhà/Tên đường">
                <Input placeholder="Nhập Số nhà/Tên đường" size="large" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="addressNumber" label="Tên tòa nhà/Số tầng">
                <Input placeholder="Nhập Tên tòa nhà/Số tầng" size="large" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item name="city">
                <Select
                  placeholder="Chọn Thành Phố"
                  size="large"
                  options={[]}
                />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item name="district">
                <Select placeholder="Chọn Quận" size="large" options={[]} />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item name="ward">
                <Select placeholder="Chọn Phường" size="large" options={[]} />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item name="zipCode">
                <Input placeholder="Nhập Mã Zip" size="large" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }} span={24}>
              <Form.Item name="isDefault">
                <Checkbox label="Đặt làm mặc định" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 16 }} span={24}>
              <div className="AddressFormModal-type d-flex align-items-center justify-content-end">
                Loại địa chỉ
                <div className="AddressFormModal-type-item">
                  <Icon name={EIconName.HomeShopdi} />
                  Nhà riêng
                </div>
                <div className="AddressFormModal-type-item">
                  <Icon name={EIconName.BriefcaseShopdi} />
                  Văn phòng
                </div>
              </div>
            </Col>
          </Row>

          <div className="AddressFormModal-submit d-flex justify-content-end">
            <Button
              title="Thêm địa chỉ"
              size="large"
              primary
              reverse
              icon={<Icon name={EIconName.Plus} color={EIconColor.GOLD} />}
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddressFormModal;
