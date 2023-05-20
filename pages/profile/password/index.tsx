import React from 'react';
import { Col, Form, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import AddressCard from 'components/AddressCard';
import Input from 'components/Input';
import Button, { EButtonStyleType } from 'components/Button';

const PasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  return (
    <GuestLayout>
      <UserLayout>
        <div className="ProfilePage">
          <Form form={form} layout="vertical">
            <AddressCard headerTitle="Mật khẩu" radius>
              <Row gutter={[24, 24]}>
                <Col lg={{ span: 12 }} span={24}>
                  <Form.Item name="oldPassword" label="Mật khẩu cũ">
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu cũ"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} span={0} />
                <Col lg={{ span: 12 }} span={24}>
                  <Form.Item name="newPassword" label="Mật khẩu mới">
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} span={0} />
                <Col lg={{ span: 12 }} span={24}>
                  <Form.Item name="newPassword" label="Xác nhận mật khẩu mới">
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </AddressCard>
            <div className="ProfilePage-submit">
              <Row gutter={[isMobile ? 16 : 24, 16]}>
                <Col>
                  <Button
                    title="Hủy thay đổi"
                    size="large"
                    styleType={EButtonStyleType.OUTLINE_BLACK}
                  />
                </Col>
                <Col>
                  <Button title="Đổi mật khẩu" size="large" primary />
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default PasswordPage;
