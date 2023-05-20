import Icon from 'components/common/Icon';
import { EnumPaymentMethodFE, NodeWallet } from 'interfaces/response/wallet';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducer';

const MethodPayments: React.FC<PropsFromRedux> = ({
  listBankTopup,
  idChecked,
  handleChange,
  setSelectedNode,
  selectedNode,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <div className="wrap-methods">
      <label htmlFor="cod" className="deposit-item">
        <div
          className={`shipping-type d-flex align-items-center w-100 justify-content-between ${
            idChecked === EnumPaymentMethodFE.COD ? 'active' : ''
          }`}
        >
          <div className="d-flex align-items-center">
            <input
              type="radio"
              checked={idChecked === EnumPaymentMethodFE.COD}
              onChange={() => {
                handleChange(EnumPaymentMethodFE.COD);
                setSelectedNode(undefined);
              }}
              id="cod"
            />
            <div className="ml-2">
              <Icon name="payment-1" size={35} />
            </div>
            <div className="ml-3">
              <div className="font-size16 font-bold mb-2">Ship COD</div>
              <div className="text-gray3">{t.shipCode}</div>
            </div>
          </div>
        </div>
      </label>
      <label htmlFor="bank" className="deposit-item">
        <div
          className={`shipping-type d-flex align-items-center w-100 justify-content-between ${
            idChecked === EnumPaymentMethodFE.BANKS ? 'active' : ''
          }`}
        >
          <div className="d-flex align-items-center">
            <input
              type="radio"
              checked={idChecked === EnumPaymentMethodFE.BANKS}
              onChange={() => {
                handleChange(EnumPaymentMethodFE.BANKS);
                setSelectedNode(undefined);
              }}
              id="bank"
            />
            <div className="ml-3">
              <img src="/svg/cart-payment.svg" alt="payment" />
            </div>
            <div className="ml-3">
              <div className="font-size16 font-bold mb-2">{t.transferBank}</div>
              <div className="text-gray3">{t.transferByBank}</div>
            </div>
          </div>
        </div>
      </label>
      <label htmlFor="wallet" className="deposit-item">
        <div
          className={`shipping-type d-flex align-items-center w-100 justify-content-between ${
            idChecked === EnumPaymentMethodFE.WALLET ? 'active' : ''
          }`}
        >
          <div className="d-flex align-items-center">
            <input
              type="radio"
              checked={idChecked === EnumPaymentMethodFE.WALLET}
              onChange={() => {
                handleChange(EnumPaymentMethodFE.WALLET);
                setSelectedNode(undefined);
              }}
              id="wallet"
            />
            <div className="ml-3">
              <img src="/svg/wallet-payment.svg" />
            </div>
            <div className="ml-3">
              <div className="font-size16 font-bold mb-2">{t.smartWallet}</div>
              <div className="text-gray3">{t.transferBySmartWallet}</div>
            </div>
          </div>
        </div>
        {idChecked === EnumPaymentMethodFE.WALLET && (
          <div className="flex-column bank-atm">
            {listBankTopup
              .find((item) => item.node.id === 'WALLET')
              ?.childrens.map((item) => (
                <div
                  key={`${item.node.id}`}
                  className="d-flex align-items-center"
                >
                  <div
                    className={`${
                      selectedNode?.id === item.node.id ? 'active' : ''
                    } item`}
                    onClick={() => setSelectedNode(item.node)}
                  >
                    <img src={item.node.image} />

                    {selectedNode?.id === item.node.id && (
                      <div className="tick">
                        <img src="/svg/tickBank.svg" />
                      </div>
                    )}
                  </div>
                  <div className="font-bold ml-2">{item.node.name}</div>
                </div>
              ))}
          </div>
        )}
      </label>
      <label htmlFor="atm" className="deposit-item">
        <div
          className={`shipping-type d-flex align-items-center w-100 justify-content-between ${
            idChecked === EnumPaymentMethodFE.ATM ? 'active' : ''
          }`}
        >
          <div className="d-flex align-items-center">
            <input
              type="radio"
              checked={idChecked === EnumPaymentMethodFE.ATM}
              onChange={() => {
                handleChange(EnumPaymentMethodFE.ATM);
                setSelectedNode(undefined);
              }}
              id="atm"
            />
            <div className="ml-3">
              <img src="/svg/cart-payment.svg" />
            </div>
            <div className="ml-3">
              <div className="font-size16 font-bold mb-2">{t.localBank}</div>
              <div className="text-gray3">{t.transferByLocalBank}</div>
            </div>
          </div>
        </div>
        {idChecked === EnumPaymentMethodFE.ATM && (
          <div className="bank-atm">
            {listBankTopup
              .find((item) => item.node.id === 'ATM')
              ?.childrens.map((item) => (
                <div
                  key={`${item.node.id}K`}
                  className={`${
                    selectedNode?.id === item.node.id ? 'active' : ''
                  } item`}
                  onClick={() => setSelectedNode(item.node)}
                >
                  <img src={item.node.image} />
                  {selectedNode?.id === item.node.id && (
                    <div className="tick">
                      <img src="/svg/tickBank.svg" />
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </label>
      <label htmlFor="mbbank" className="deposit-item">
        <div
          className={`shipping-type d-flex align-items-center w-100 justify-content-between ${
            idChecked === EnumPaymentMethodFE.MBBANK ? 'active' : ''
          }`}
        >
          <div className="d-flex align-items-center">
            <input
              type="radio"
              checked={idChecked === EnumPaymentMethodFE.MBBANK}
              onChange={() => {
                handleChange(EnumPaymentMethodFE.MBBANK);
                setSelectedNode(undefined);
              }}
              id="mbbank"
            />
            <div className="ml-3">
              <img src="/svg/cart-payment.svg" />
            </div>
            <div className="ml-3">
              <div className="font-size16 font-bold mb-2">{t.localBank}</div>
              <div className="text-gray3">{t.transferByVisaMb}</div>
            </div>
          </div>
        </div>
      </label>
      <label htmlFor="visa" className="deposit-item">
        <div
          className={`shipping-type d-flex align-items-center w-100 justify-content-between ${
            idChecked === EnumPaymentMethodFE.VISA ? 'active' : ''
          }`}
        >
          <div className="d-flex align-items-center">
            <input
              type="radio"
              checked={idChecked === EnumPaymentMethodFE.VISA}
              onChange={() => {
                handleChange(EnumPaymentMethodFE.VISA);
                setSelectedNode(undefined);
              }}
              id="visa"
            />
            <div className="ml-3">
              <img src="/svg/visa-payment.svg" />
            </div>
            <div className="ml-3">
              <div className="font-size16 font-bold mb-2">Visa/Master</div>
              <div className="text-gray3">{t.transferByVisa}</div>
            </div>
          </div>
        </div>
        {idChecked === EnumPaymentMethodFE.VISA && (
          <div className="flex-column bank-atm">
            {listBankTopup
              .find((item) => item.node.id === 'VISAMASTERCARD')
              ?.childrens.map((item) => (
                <div className="d-flex align-items-center">
                  <div
                    className={`${
                      selectedNode?.id === item.node.id ? 'active' : ''
                    } item`}
                    onClick={() => setSelectedNode(item.node)}
                  >
                    <img src={item.node.image} />

                    {selectedNode?.id === item.node.id && (
                      <div className="tick">
                        <img src="/svg/tickBank.svg" />
                      </div>
                    )}
                  </div>
                  <div className="font-bold ml-2">{item.node.name}</div>
                </div>
              ))}
          </div>
        )}
      </label>
    </div>
  );
};

interface MethodPaymentsProps {
  idChecked: EnumPaymentMethodFE;
  handleChange: (id: EnumPaymentMethodFE) => void;
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeWallet | undefined>>;
  selectedNode: NodeWallet | undefined;
}
const mapStateToProps = (state: RootState, ownProps: MethodPaymentsProps) => ({
  ...ownProps,
  products: state.cart.products,
  stores: state?.cart?.data,
  listBankTopup: state.wallet.listBankTopup,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, {});

export default connector(MethodPayments);
