import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import CartTransferPayment from 'containers/CartTransferPayment';
import ChargeCoinModal from 'containers/ChargeCoinModal';

const TransferInformationPage: React.FC = () => {
  const [chargeCoinModalState, setChargeCoinModalState] = useState<{
    visible: boolean;
  }>({ visible: true });

  const handleOpenChargeCoinModal = (): void => {
    setChargeCoinModalState({ visible: true });
  };

  const handleCloseChargeCoinModal = (): void => {
    setChargeCoinModalState({ visible: false });
  };

  return (
    <GuestLayout>
      <UserLayout>
        <div className="TransferInformationPage">
          <CartTransferPayment />

          <ChargeCoinModal
            {...chargeCoinModalState}
            onClose={handleCloseChargeCoinModal}
          />
        </div>
      </UserLayout>
    </GuestLayout>
  );
};

export default TransferInformationPage;
