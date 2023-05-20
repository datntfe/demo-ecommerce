import React from 'react';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import FormPopup from 'components/common/FormPopup';
import ShippingAddress, {
  UpdateShippingAddressData,
} from 'components/users/ShippingAddress';
import { AddressEntity } from 'interfaces/types/user';

interface ManageAddressProps {
  onCancel: () => void;
  onConfirm: () => void;
  shippingAddressList: AddressEntity[];
  onDeleteAddress: (id: string) => void;
  onUpdateAddress: (params: UpdateShippingAddressData) => void;
  selectAddress?: AddressEntity;
  onChecked: (item: AddressEntity) => void;
  addMoreAddress: () => void;
}
const ManageAddress: React.FC<ManageAddressProps> = ({
  onCancel,
  onConfirm,
  shippingAddressList,
  onDeleteAddress,
  onUpdateAddress,
  selectAddress,
  onChecked,
  addMoreAddress,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <FormPopup
      button={t.shippingToAddress}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title={t.addressReceived}
      showButton={false}
      width={800}
      zIndex={90}
    >
      <div>
        <div className="scroll-address">
          {shippingAddressList.map((item) => (
            <ShippingAddress
              // eslint-disable-next-line no-nested-ternary
              label={
                item.type === 0 ? t.home : item.type === 1 ? t.office : t.orther
              }
              key={item.id}
              onDeleteAddress={onDeleteAddress}
              onUpdate={onUpdateAddress}
              isSelected={item.id === selectAddress?.id}
              onChecked={() => onChecked(item)}
              {...item}
            />
          ))}
        </div>

        <div className="font-size12 mt-3">
          <span>{t.shipToanotherAddress}</span>
          <span
            className="text-blue2 ml-2 cursor-pointer"
            onClick={addMoreAddress}
          >
            {t.addMoreAddress}
          </span>
        </div>
      </div>
    </FormPopup>
  );
};

export default ManageAddress;
