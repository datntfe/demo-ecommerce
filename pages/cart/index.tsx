import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import Step, { TStepData } from 'components/Step';
import { scrollToTop } from 'utils/functions';
import ProductsCarousel from 'containers/ProductsCarousel';
import CartSummaryOrder from 'containers/CartSummaryOrder';
import CartProducts from 'containers/CartProducts';
import CartDelivery from 'containers/CartDelivery';
import CartPayment from 'containers/CartPayment';
import AddressFormModal from 'containers/AddressFormModal';
import CartOrderSuccess from 'containers/CartOrderSuccess';
import DeliveryMethodModal from 'containers/DeliveryMethodModal';
import { EKeyCartStep } from 'pages/cart/CartPage.enums';
import CartTransferPayment from 'containers/CartTransferPayment';

import { dataCartStepOptions } from './CartPage.data';

const CartPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  const [step, setStep] = useState<TStepData>(dataCartStepOptions[0]);
  const [addressFormModalState, setAddressFormModalState] = useState<{
    visible: boolean;
  }>({ visible: false });

  const [deliveryMethodModalState, setDeliveryMethodModalState] = useState<{
    visible: boolean;
  }>({ visible: false });

  const handleOpenAddressFormModal = (): void => {
    setAddressFormModalState({ visible: true });
  };

  const handleCloseAddressFormModal = (): void => {
    setAddressFormModalState({ visible: false });
  };

  const handleOpenDeliveryMethodModal = (): void => {
    setDeliveryMethodModalState({ visible: true });
  };

  const handleCloseDeliveryMethodModal = (): void => {
    setDeliveryMethodModalState({ visible: false });
  };

  useEffect(() => {
    scrollToTop();
  }, [step]);

  return (
    <GuestLayout>
      <div className="CartPage">
        <Step
          showSingle={isMobile}
          value={step}
          options={dataCartStepOptions}
          justify="start"
        />
        <div className="CartPage-wrapper">
          <div className="container">
            {step.value === EKeyCartStep.SUCCESS ? (
              <CartOrderSuccess />
            ) : (
              <Row gutter={[24, 24]}>
                <Col xl={{ span: 16 }} span={24}>
                  {step.value === EKeyCartStep.CART && (
                    <CartProducts
                      onNext={(): void => setStep(dataCartStepOptions[1])}
                    />
                  )}

                  {step.value === EKeyCartStep.DELIVERY && (
                    <CartDelivery
                      onNext={(): void => setStep(dataCartStepOptions[2])}
                      onAddAddress={handleOpenAddressFormModal}
                    />
                  )}

                  {step.value === EKeyCartStep.PAYMENT && (
                    <CartPayment
                      onNext={(): void => setStep(dataCartStepOptions[3])}
                      onTransfer={(): void => {
                        setStep({
                          ...dataCartStepOptions[3],
                          value: EKeyCartStep.TRANSFER,
                        });
                      }}
                    />
                  )}

                  {step.value === EKeyCartStep.TRANSFER && (
                    <CartTransferPayment
                      onNext={(): void => setStep(dataCartStepOptions[3])}
                    />
                  )}
                </Col>
                <Col xl={{ span: 8 }} span={24}>
                  <CartSummaryOrder
                    onChangeDeliveryMethod={handleOpenDeliveryMethodModal}
                    onEditAddress={handleOpenAddressFormModal}
                  />
                </Col>
              </Row>
            )}

            <ProductsCarousel title="GỢI Ý HÔM NAY" />
          </div>
        </div>

        <AddressFormModal
          {...addressFormModalState}
          onClose={handleCloseAddressFormModal}
        />

        <DeliveryMethodModal
          {...deliveryMethodModalState}
          onClose={handleCloseDeliveryMethodModal}
        />
      </div>
    </GuestLayout>
  );
};

export default CartPage;
