import React from 'react';
import { Col, Form, Row } from 'antd';

import AddressCard from 'components/AddressCard';
import { EAddressCardType } from 'components/AddressCard/AddressCard.enums';
import Button, { EButtonStyleType } from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import DeliveryCard from 'components/DeliveryCard';
import Input from 'components/Input';
import Select from 'components/Select';
import { validationRules } from 'utils/functions';

import { TCartDeliveryProps } from './CartDelivery.types';

const CartDelivery: React.FC<TCartDeliveryProps> = ({
  onAddAddress,
  onNext,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (): void => {
    onNext?.();
  };

  return (
    <div className="CartDelivery">
      <div className="CartDelivery-wrapper">
        <h3 className="CartPage-title">THÔNG TIN GIAO HÀNG</h3>

        <div className="CartSummaryOrder-bill-text">Đăng nhập bằng</div>
        <br />
        <Row gutter={[24, 12]}>
          <Col sm={{ span: 8 }} span={24}>
            <Button
              title="Tài khoản Shopdi"
              styleType={EButtonStyleType.OUTLINE_BLACK}
            />
          </Col>
          <Col sm={{ span: 8 }} span={24}>
            <Button
              reverse
              title="Google"
              styleType={EButtonStyleType.OUTLINE_BLACK}
              icon={
                <Icon name={EIconName.Google} color={EIconColor.EBONY_CLAY} />
              }
            />
          </Col>
          <Col sm={{ span: 8 }} span={24}>
            <Button
              reverse
              title="Facebook"
              styleType={EButtonStyleType.OUTLINE_BLACK}
              icon={
                <Icon name={EIconName.Facebook} color={EIconColor.EBONY_CLAY} />
              }
            />
          </Col>
        </Row>

        <div className="line" />

        <div className="CartDelivery-address-form">
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
              <Col span={24}>
                <Form.Item
                  name="phoneNumber"
                  label="Số Điện Thoại"
                  required
                  rules={[validationRules.required()]}
                >
                  <Input
                    placeholder="Nhập Số Điện Thoại"
                    size="large"
                    numberic
                  />
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
            </Row>
          </Form>
        </div>

        <div className="CartDelivery-address">
          <AddressCard
            name="Nguyễn Thanh Hiếu"
            phoneNumber="032424475"
            type={EAddressCardType.HORIZONTAL}
            address="50 Quang Trung, Phường xyz, Quận abc, Thành phố qwe, 700000, Việt Nam"
            email="hieunguyenn0001@gmail.com"
            home
            office
            defaultAddress
          />

          <div className="CartDelivery-address-add d-flex">
            <Button
              title="Thêm địa chỉ"
              size="middle"
              styleType={EButtonStyleType.OUTLINE_BLACK}
              icon={<Icon name={EIconName.Plus} color={EIconColor.BLACK} />}
              onClick={onAddAddress}
            />
          </div>
        </div>

        <h3 className="CartPage-title">CHỌN PHƯƠNG THỨC VẬN CHUYỂN</h3>

        <div className="CartDelivery-method">
          <DeliveryCard
            title="Nhanh"
            description={
              <>
                Nhận hàng vào
                <strong>Thứ 2, 18/09 - Thứ 4, 20/09</strong>
              </>
            }
            iconName={EIconName.TruckShopdi}
            price="24.200 đ"
            showTooltip
          />
          <DeliveryCard
            title="Nhanh"
            description={
              <>
                Nhận hàng vào
                <strong>Thứ 2, 18/09 - Thứ 4, 20/09</strong>
              </>
            }
            iconName={EIconName.TruckShopdi}
            price="24.200 đ"
            showTooltip
          />
          <DeliveryCard
            title="Nhanh"
            description={
              <>
                Nhận hàng vào
                <strong>Thứ 2, 18/09 - Thứ 4, 20/09</strong>
              </>
            }
            iconName={EIconName.TruckShopdi}
            price="24.200 đ"
            showTooltip
          />
        </div>

        <div className="CartDelivery-submit d-flex justify-content-end">
          <Button
            primary
            title="Thanh toán"
            size="large"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CartDelivery;
