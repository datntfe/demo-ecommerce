/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Col, Form, Row } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';

import Button from 'components/Button';
import Input from 'components/Input';
import { validationRules } from 'utils/functions';
import CartPaymentMethod, {
  TCartPaymentMethodData,
  TCartPaymentMethodSuffix,
  TCartPaymentParams,
} from 'containers/CartPayment/CartPaymentMethod';

import {
  dataBankPaymentOptions,
  dataWalletPaymentOptions,
} from './CartPayment.data';
import { TCartPaymentProps } from './CartPayment.types';

const CartPayment: React.FC<TCartPaymentProps> = ({ onTransfer, onNext }) => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState<{
    checked?: TCartPaymentMethodData;
    data?: TCartPaymentMethodSuffix;
  }>();

  const dataPaymentMethodsOptions = [
    {
      key: 'cod',
      title: 'THANH TOÁN KHI GIAO HÀNG',
      description: 'Thanh toán khi nhận hàng',
    },
    {
      key: 'wallet',
      title: 'VÍ ĐIỆN TỬ',
      description: 'Thanh toán bằng ví Momo, ví VNPay...',
      expand: ({ onClose }: TCartPaymentParams): React.ReactNode => (
        <div className="CartPaymentMethod-wallet-btn-wrapper">
          <Row gutter={[48, 12]}>
            {dataWalletPaymentOptions.map((item) => (
              <Col>
                <div
                  key={item.value}
                  className={classNames(
                    'CartPaymentMethod-wallet-btn d-flex align-items-center',
                    { active: paymentMethod?.data?.value === item.value },
                  )}
                  onClick={(): void => {
                    setPaymentMethod({ ...paymentMethod, data: item });
                    onClose?.();
                  }}
                >
                  <div className="CartPaymentMethod-wallet-btn-icon">
                    <Image src={item.image} layout="fill" objectFit="cover" />
                  </div>
                  {item.title}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      key: 'banking',
      title: 'ATM NỘI ĐỊA/ INTERNET BANKING',
      noShowLabel: true,
      description: 'Vietcombank/Techcombank/VP Bank...',
      expand: ({ onClose }: TCartPaymentParams): React.ReactNode => (
        <div className="CartPaymentMethod-bank-btn-wrapper">
          <Row gutter={[16, 16]}>
            {dataBankPaymentOptions.map((item) => (
              <Col lg={{ span: 4 }} md={{ span: 6 }} span={8}>
                <div
                  key={item.value}
                  className={classNames(
                    'CartPaymentMethod-bank-btn d-flex align-items-center',
                    { active: paymentMethod?.data?.value === item.value },
                  )}
                  onClick={(): void => {
                    setPaymentMethod({ ...paymentMethod, data: item });
                    onClose?.();
                  }}
                >
                  <div className="CartPaymentMethod-bank-btn-icon">
                    <img src={item.image} alt="" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      key: 'card',
      title: 'VISA/ MASTER',
      description: 'Thanh toán bằng thẻ VISA/Master Card',
      expand: (): React.ReactElement => (
        <div className="CartPayment-card-info">
          <Row gutter={[32, 32]}>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="cardNumber"
                label="Mã số thẻ"
                required
                rules={[validationRules.required()]}
              >
                <Input placeholder="Nhập mã thẻ" size="large" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="cardName"
                label="Tên trên thẻ"
                required
                rules={[validationRules.required()]}
              >
                <Input placeholder="Nhập tên trên thẻ" size="large" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="dateIssue"
                label="Tháng/Năm"
                required
                rules={[validationRules.required()]}
              >
                <Input placeholder="Nhập tháng/năm *" size="large" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
              <Form.Item
                name="cardName"
                label="CVV"
                required
                rules={[validationRules.required()]}
              >
                <Input placeholder="Nhập CVV" size="large" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'transfer',
      title: 'CHUYỂN KHOẢN',
      description: 'Thanh toán thông qua chuyển khoản',
    },
  ];

  const handleSubmit = (): void => {
    if (paymentMethod?.checked?.key === 'transfer') onTransfer?.();
    else onNext?.();
  };

  return (
    <div className="CartPayment">
      <div className="CartPayment-wrapper">
        <h3 className="CartPage-title">PHƯƠNG THỨC THANH TOÁN</h3>
        <div className="CartSummaryOrder-bill-text">
          Tất cả giao dịch đều an toàn và bảo mật
        </div>

        <br />

        <Form form={form} layout="vertical">
          <div className="CartPayment-methods">
            {dataPaymentMethodsOptions.map((option) => {
              const isChecked = paymentMethod?.checked?.key === option.key;

              return (
                <CartPaymentMethod
                  {...option}
                  suffix={
                    paymentMethod?.checked?.key === option.key
                      ? paymentMethod?.data
                      : undefined
                  }
                  checked={isChecked}
                  onClick={(): void => {
                    setPaymentMethod({
                      checked: option,
                      data:
                        paymentMethod?.checked?.key === option.key
                          ? paymentMethod.data
                          : undefined,
                    });
                  }}
                />
              );
            })}
          </div>
        </Form>

        <div className="CartPayment-submit d-flex justify-content-end">
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

export default CartPayment;
