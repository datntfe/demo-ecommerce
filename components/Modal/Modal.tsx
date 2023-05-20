import React from 'react';
import { Modal as AntdModal } from 'antd';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TModalProps } from './Modal.types';

const Modal: React.FC<TModalProps> = ({
  visible,
  width,
  title,
  className,
  children,
  onClose,
}) => (
  <AntdModal
    className={classNames('Modal', className)}
    visible={visible}
    onCancel={onClose}
    closable={false}
    width={width}
    footer={null}
  >
    <div className="Modal-wrapper">
      <div className="Modal-close" onClick={onClose}>
        <Icon name={EIconName.X} color={EIconColor.DOVE_GRAY} />
      </div>

      {title && (
        <div className="Modal-header">
          <h4 className="Modal-title">{title}</h4>
        </div>
      )}

      <div className="Modal-body">{children}</div>
    </div>
  </AntdModal>
);

export default Modal;
