import React from 'react';
import { Col, Form, Rate, Row } from 'antd';

import Modal from 'components/Modal';
import Button, { EButtonStyleType } from 'components/Button';
import TextArea from 'components/TextArea';
import Upload from 'components/Upload';
import ProductHorizontal from 'components/ProductHorizontal';
import Icon, { EIconName } from 'components/Icon';

import { TReviewModalProps } from './ReviewModal.types';

const ReviewModal: React.FC<TReviewModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      className="ReviewModal"
      visible={visible}
      onClose={onClose}
      width={600}
    >
      <div className="ReviewModal-wrapper">
        <Form form={form} layout="vertical">
          <div className="ReviewModal-header">
            <ProductHorizontal
              size="small"
              title={<strong>IPhone 13 Chính hãng / màu trắng / 512 Gb</strong>}
              description="06/04/2022 04:13"
            />
          </div>
          <div className="ReviewModal-body">
            <div className="ReviewModal-body-title text-center">ĐÁNH GIÁ</div>
            <Form.Item name="rate">
              <Rate allowHalf={false} />
            </Form.Item>
            <Form.Item name="description">
              <TextArea
                maxLength={120}
                showCount
                placeholder="Chia sẻ thêm thông tin sản phẩm"
              />
            </Form.Item>
            <div className="ReviewModal-quick-options">
              <Row gutter={[4, 4]}>
                {[
                  'Rất hài lòng!',
                  'Hài lòng!',
                  'Giao hàng nhanh, sản phẩm giống như hình!',
                  'Mua BID giá tốt, giao hàng nhanh!',
                  'Giao hàng chậm, cần cải thiện thêm.',
                ].map((item) => (
                  <Col>
                    <div className="ReviewModal-quick-options-item">{item}</div>
                  </Col>
                ))}
              </Row>

              <div className="ReviewModal-uploads">
                <Row gutter={[12, 12]}>
                  {[1, 2, 3].map((item) => (
                    <Col>
                      <div className="ReviewModal-uploads-item">
                        <img src="/img/image-product.png" alt="" />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
          <div className="ReviewModal-submit">
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Upload multiple>
                  <Button
                    styleType={EButtonStyleType.OUTLINE_BLACK}
                    size="large"
                    title="Thêm ảnh"
                    reverse
                    icon={<Icon name={EIconName.CameraShopdi} />}
                  />
                </Upload>
              </Col>
              <Col span={12}>
                <Button
                  styleType={EButtonStyleType.PRIMARY}
                  size="large"
                  title="Gửi đánh giá"
                />
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
