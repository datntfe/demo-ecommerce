import React from 'react';

import Button, { EButtonStyleType } from 'components/Button';
import Modal from 'components/Modal/Modal';

import Empty from 'components/Empty';
import { TModalConfirmProps } from './ModalConfirm.types';

const ModalConfirm: React.FC<TModalConfirmProps> = ({
  visible,
  onClose,
  onSubmit,
  width,
  loading,
  title,
  description,
  iconName,
}) => (
  <Modal
    className="ModalConfirm"
    visible={visible}
    onClose={onClose}
    width={width || 600}
  >
    <div className="ModalConfirm-wrapper">
      <Empty iconName={iconName} title={title} text={description} />

      <div className="ModalConfirm-submit d-flex">
        <Button
          size="large"
          title="Huỷ"
          styleType={EButtonStyleType.OUTLINE_BLACK}
          onClick={onClose}
          disabled={loading}
        />
        <Button
          size="large"
          title="Xác nhận"
          primary
          onClick={onSubmit}
          disabled={loading}
        />
      </div>
    </div>
  </Modal>
);

export default ModalConfirm;
