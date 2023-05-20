import React from 'react';
import { Col, Form, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import AddressCard from 'components/AddressCard';
import Input from 'components/Input';
import Select from 'components/Select';
import Button, { EButtonStyleType } from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import Link from 'next/link';
import UploadAvatar from 'components/UploadAvatar';

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  return (
    <GuestLayout>
      <UserLayout>
        <div className="ProfilePage">
          <Form form={form} layout="vertical">
            <AddressCard headerTitle="THÔNG TIN CÁ NHÂN" radius>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <div className="ProfilePage-avatar d-flex align-items-start">
                    <div className="ProfilePage-avatar-upload">
                      <Form.Item name="avatar">
                        <UploadAvatar />
                      </Form.Item>
                    </div>
                    <div className="ProfilePage-avatar-info">
                      <div className="ProfilePage-avatar-info-title">
                        ẢNH ĐẠI DIỆN
                      </div>
                      <div className="ProfilePage-avatar-info-description">
                        Chọn hoặc thay đổi ảnh hồ sơ của bạn
                      </div>
                      <div className="ProfilePage-avatar-info-description action">
                        Xoá hình ảnh
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={{ span: 12 }} span={24}>
                  <Form.Item name="name" label="Họ và tên">
                    <Input placeholder="Nhập dữ liệu" size="large" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 12 }} span={24}>
                  <Form.Item name="phoneNumber" label="Số điện thoại">
                    <Input placeholder="Nhập dữ liệu" size="large" numberic />
                  </Form.Item>
                </Col>
                <Col md={{ span: 12 }} span={24}>
                  <Form.Item label="Ngày sinh">
                    <Row gutter={[8, 16]}>
                      <Col sm={{ span: 8 }} span={24}>
                        <Form.Item name="day">
                          <Select
                            placeholder="Ngày"
                            size="large"
                            options={[]}
                          />
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 8 }} span={24}>
                        <Form.Item name="month">
                          <Select
                            placeholder="Tháng"
                            size="large"
                            options={[]}
                          />
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 8 }} span={24}>
                        <Form.Item name="year">
                          <Select placeholder="Năm" size="large" options={[]} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
                <Col md={{ span: 12 }} span={24}>
                  <Form.Item name="gender" label="Giới tính">
                    <Select
                      placeholder="Chọn dữ liệu"
                      size="large"
                      options={[]}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 12 }} span={24}>
                  <Form.Item name="email" label="Email">
                    <Input placeholder="Nhập dữ liệu" size="large" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 12 }} span={24}>
                  <Form.Item label="Liên kết mạng xã hội">
                    <Row gutter={[8, 8]} style={{ marginTop: '.6rem' }}>
                      <Col md={{ span: 12 }} span={24}>
                        <Button
                          reverse
                          styleType={EButtonStyleType.OUTLINE_BLACK}
                          title={
                            <>
                              Google <Link href="#">Liên kết</Link>
                            </>
                          }
                          icon={
                            <Icon
                              name={EIconName.Google}
                              color={EIconColor.BLACK}
                            />
                          }
                        />
                      </Col>
                      <Col md={{ span: 12 }} span={24}>
                        <Button
                          reverse
                          styleType={EButtonStyleType.OUTLINE_BLACK}
                          title={
                            <>
                              Facebook <Link href="#">Liên kết</Link>
                            </>
                          }
                          icon={
                            <Icon
                              name={EIconName.Facebook}
                              color={EIconColor.BLACK}
                            />
                          }
                        />
                      </Col>
                    </Row>
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
                  <Button title="Lưu thay đổi" size="large" primary />
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default ProfilePage;
