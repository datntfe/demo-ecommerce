import React from 'react';
import { Col, Row } from 'antd';

import ProductVertical from 'components/ProductVertical';
import ProductHorizontal from 'components/ProductHorizontal';
import Button, { EButtonStyleType } from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import ShopCard from 'components/ShopCard';
import Voucher from 'components/Voucher';
import Step from 'components/Step';
import Comment from 'components/Comment';
import CategoryHeader from 'components/CategoryHeader';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import Select from 'components/Select';
import Slider from 'components/Slider';
import MemberCard from 'components/MemberCard';
import VoucherBox from 'components/VoucherBox';
import HistoryPaymentCard from 'components/HistoryPaymentCard';

const Guide: React.FC = () => (
  <div className="Guide" style={{ padding: 48 }}>
    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Product Vertical</h1>
      <br />
      <Row>
        <Col span={8}>
          <ProductVertical />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Product Horizontal</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ProductHorizontal
            title={
              <>
                Kiện hàng <strong>AELGNLKSM</strong> của đơn hàng{' '}
                <strong>LAKDNOAIA</strong> đã được giao thành công đến bạn.
              </>
            }
            description="06/04/2022 04:13"
            buttonProps={{ title: 'Đánh giá' }}
          />
        </Col>
        <Col span={24}>
          <ProductHorizontal
            size="small"
            title={<strong>IPhone 13 Chính hãng / màu trắng / 512 Gb </strong>}
            description="06/04/2022 04:13"
          />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Button</h1>
      <br />
      <Row gutter={[24, 24]}>
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
        <Col>
          <Button
            title="Thêm địa chỉ"
            size="large"
            primary
            icon={<Icon name={EIconName.Plus} color={EIconColor.GOLD} />}
            reverse
          />
        </Col>
        <Col>
          <Button
            title="Nạp xu"
            size="large"
            styleType={EButtonStyleType.DEFAULT}
          />
        </Col>
        <Col span={24} />
        <Col span={6}>
          <Button
            title="Thêm thời gian 10"
            size="large"
            styleType={EButtonStyleType.YELLOW}
            icon={<Icon name={EIconName.ShopdiCoin} />}
          />
        </Col>

        <Col span={6}>
          <Button
            title="Đặt cọc với 500"
            size="large"
            icon={<Icon name={EIconName.ShopdiCoin} color={EIconColor.WHITE} />}
            primary
          />
        </Col>

        <Col span={24} />
        <Col span={6}>
          <Button
            title="Tài khoản Shopdi"
            styleType={EButtonStyleType.OUTLINE_BLACK}
          />
        </Col>
        <Col span={6}>
          <Button
            title="Google"
            reverse
            icon={
              <Icon name={EIconName.Google} color={EIconColor.EBONY_CLAY} />
            }
            styleType={EButtonStyleType.OUTLINE_BLACK}
          />
        </Col>
        <Col span={6}>
          <Button
            title="Facebook"
            reverse
            icon={
              <Icon name={EIconName.Facebook} color={EIconColor.EBONY_CLAY} />
            }
            styleType={EButtonStyleType.OUTLINE_BLACK}
          />
        </Col>

        <Col span={6}>
          <Button
            title="Facebook"
            disabled
            radius={false}
            reverse
            icon={
              <Icon name={EIconName.Facebook} color={EIconColor.EBONY_CLAY} />
            }
            styleType={EButtonStyleType.OUTLINE_BLACK}
          />
        </Col>

        <Col span={24} />
        <Col>
          <Button
            size="small"
            title="Tài khoản Shopdi"
            primary
            reverse
            icon={<Icon name={EIconName.ShopdiCoin} color={EIconColor.WHITE} />}
          />
        </Col>

        <Col>
          <Button
            size="small"
            title="Tài khoản Shopdi"
            styleType={EButtonStyleType.OUTLINE_BLACK}
          />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Shop Card</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ShopCard
            logo="/img/logo-shop.png"
            title="Louis Vuitton"
            subtitle="Louis Vuitton Store"
            description="1k2 Người theo dõi | 5.0 Đánh giá"
            size="large"
            amountProduct="219"
            percentResponse="100%"
            response="Trong vài giờ"
          />
        </Col>

        <Col span={24}>
          <ShopCard
            logo="/img/logo-shop.png"
            background="/img/bg-shop.png"
            title="Louis Vuitton"
            subtitle="Louis Vuitton Store"
            size="small"
            amountProduct="219"
            percentResponse="100%"
            response="Trong vài giờ"
            showShop
          />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Voucher</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Voucher />
        </Col>

        <Col span={8}>
          <Voucher active />
        </Col>

        <Col span={8}>
          <Voucher disabled />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Step</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Step
            value={{ key: 2, label: 'Giao hàng' }}
            options={[
              { key: 1, label: 'Giỏ hàng' },
              { key: 2, label: 'Giao hàng' },
              { key: 3, label: 'Thanh toán' },
              { key: 4, label: 'Hoàn thành đơn hàng' },
            ]}
          />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Comment</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Comment />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Category Header</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <CategoryHeader title="SẢN PHẨM GIỚI HẠN" countdown="02:00:00" />
        </Col>

        <Col span={24}>
          <CategoryHeader title="HOT DEAL" />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Input</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Input placeholder="Tìm kiếm ngân hàng" />
        </Col>
        <Col span={6}>
          <Input value="Đồng hồ chính hãng" />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Tìm kiếm ngân hàng"
            suffix={
              <Icon name={EIconName.Search} color={EIconColor.EBONY_CLAY} />
            }
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Tìm kiếm ngân hàng"
            prefix={<Icon name={EIconName.SearchShopdi} />}
            noAffixBorder
          />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Select</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Select placeholder="Tìm kiếm ngân hàng" />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Chọn lý do hủy"
            options={[
              { label: 'Đặt nhầm sản phẩm', value: '1' },
              { label: 'Đơn trùng', value: '2' },
              { label: 'Không muốn mua nữa', value: '3' },
              { label: 'Muốn đổi sản phẩm khác', value: '4' },
            ]}
          />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Checkbox</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Checkbox label="Heading 1" />
        </Col>
        <Col span={8}>
          <Checkbox label="Heading 2" value />
        </Col>
        <Col span={8}>
          <Checkbox label="Heading 3" disabled />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>Slider</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Slider />
        </Col>

        <Col span={8}>
          <Slider range />
        </Col>
      </Row>
    </div>

    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>MemberCard</h1>
      <h1>VoucherBox</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <MemberCard title="Platinum" description={[1,2,3,4,5]} />
        </Col>
        <Col span={6}>
          <VoucherBox number="200" description={[1,2,3,4,5]} />
        </Col>
      </Row>
    </div>
    <div className="Guide-group" style={{ marginBottom: 64 }}>
      <h1>HistoryPaymentCard</h1>
      <br />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <HistoryPaymentCard />
        </Col>
      </Row>
    </div>
  </div>
);

export default Guide;
