import React from 'react';
import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';

interface DeleteAddressProps {
  onCancel: () => void;
  onConfirm: () => void;
}
const DeleteAddress: React.FC<DeleteAddressProps> = ({
  onCancel,
  onConfirm,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <ConfirmPopup onCancel={onCancel} onConfirm={onConfirm} title="XÓA ĐỊA CHỈ">
      <div className="text-center mb-3">
        <img src="/svg/trash.svg" alt="trash" />
      </div>

      <div className="text-center font-size20">{t.confirmDelete}</div>
      <div className="text-center mt-2">{t.cannotRecoverAddress}</div>
    </ConfirmPopup>
  );
};

export default DeleteAddress;
