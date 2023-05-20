import FormPopup from 'components/common/FormPopup';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledWrap = styled.div`
  .tip {
    background: #f0f0f0;
    border-radius: 4px;
    padding: 12px 16px;
  }
  .text-area {
    width: 100%;
    border: 1px solid #cccccc;
    border-radius: 8px;
    padding: 11px 10px;
  }
`;

interface CancelOrderPopupProps {
  onCancel: () => void;
  onConfirm: (data: { reasonId: string; reason: string }) => void;
  orderId: number | string;
  isLoading: boolean;
}
const CancelOrderPopup: React.FC<CancelOrderPopupProps> = ({
  onCancel,
  onConfirm,
  orderId,
  isLoading,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [reasonId, setReasonId] = useState('');
  const [reason, setReason] = useState('');

  return (
    <FormPopup
      button={t.agree}
      onCancel={onCancel}
      onConfirm={() => onConfirm({ reasonId, reason })}
      title={t.cancelOrder}
      width={510}
      isLoading={isLoading}
    >
      <StyledWrap>
        <div className="mbt-5">
          {t.orderCode}: #{orderId}
        </div>
        <div
          className="tip mbt-5"
          dangerouslySetInnerHTML={{ __html: t.hintCancelOrder }}
        />
        <select
          name="cars"
          className="select mb-4 select-input w-100"
          onChange={(e) => setReasonId(e.target.value)}
        >
          <option value="0">Chọn lý do hủy</option>
          <option value="1">Đặt nhầm sản phẩm</option>
          <option value="2">Đơn trùng</option>
          <option value="2">Không muốn mua nữa</option>
          <option value="2">Muốn đổi sản phẩm khác</option>
        </select>
        <div className="text-gray3 mb-3">{t.note}</div>
        <textarea
          id="w3review"
          name="w3review"
          className="text-area"
          rows={5}
          onChange={(e) => setReason(e.target.value)}
        />
      </StyledWrap>
    </FormPopup>
  );
};

export default CancelOrderPopup;
