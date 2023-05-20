import React from 'react';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import Image from 'next/image';

import Icon, { EIconName } from 'components/Icon';
import Avatar from 'components/Avatar';

import { TCommentProps } from './Comment.types';

const Comment: React.FC<TCommentProps> = () => (
  <div className={classNames('Comment')}>
    <div className="Comment-wrapper">
      <div className="Comment-header d-flex align-items-center">
        <Avatar size="2.4rem" />
        <div className="Comment-header-name">Nguyễn Văn Sơn</div>
        <div className="Comment-header-rate d-flex align-items-center">
          <Icon name={EIconName.StarFill} />
          <Icon name={EIconName.StarFill} />
          <Icon name={EIconName.StarFill} />
          <Icon name={EIconName.StarFill} />
          <Icon name={EIconName.StarFill} />
        </div>
      </div>

      <div className="Comment-body">
        Điện thoại tốt, dùng rất ổn định nhưng cầm khá là nặng tay, không dễ
        chịu như cầm 13 Pro
      </div>

      <div className="Comment-uploads">
        <Row gutter={[10, 10]}>
          <Col>
            <div className="Comment-uploads-item">
              <Image src="/img/image-product.png" layout="fill" />
            </div>
          </Col>

          <Col>
            <div className="Comment-uploads-item">
              <Image src="/img/image-product.png" layout="fill" />
            </div>
          </Col>
        </Row>
      </div>
    </div>

    <div className="Comment-wrapper reply">
      <div className="Comment-header d-flex align-items-center">
        <Avatar size="2.4rem" image="/img/logo-shop.png" />
        <div className="Comment-header-name">Hoàng Ngọc</div>
        <div className="Comment-header-badge">Quản trị viên</div>
      </div>

      <div className="Comment-body">
        Cảm ơn bạn đã tin tưởng mua hàng tại ShopDi. Có lẽ sau 1 thời gian cầm
        sẽ quen thôi ạ. Chúc bạn có trải nghiệm điện thoại mới thú vị!
      </div>
    </div>
  </div>
);

export default Comment;
