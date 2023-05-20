import BankListDeposit from 'components/users/BankListDeposit';
import { BannerWallet } from 'components/users/BannerWallet';
import LeftSide from 'components/users/LeftSide';
import {
  EnumPaymentMethod,
  EnumPaymentMethodFE,
  NodeWallet,
} from 'interfaces/response/wallet';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListBankTopup, getShopdiBankAccount } from 'redux/action/wallet';
import { RootState } from 'redux/reducer';
import { topupWalletServices } from 'services/wallet';
import styled from 'styled-components';
import { formatVietnamDong } from 'utils';

const StyledWrapInner = styled.div`
  .wallet {
    background: #fffbeb;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    align-items: center;
  }
`;

interface StyledDepositItemProps {
  isActive: boolean;
}

export const FAKE_DEPOSIT = [
  {
    id: 1,
    price: 20,
  },
  {
    id: 2,
    price: 50,
  },
  {
    id: 3,
    price: 100,
  },
  {
    id: 4,
    price: 200,
  },
  {
    id: 5,
    price: 500,
  },
  {
    id: 6,
    price: 1000,
  },
  {
    id: 7,
    price: 2000,
  },
  {
    id: 8,
    price: 5000,
  },
];

interface StyledShipTypeProps {
  isChecked: boolean;
}

const StyledShipType = styled.label<StyledShipTypeProps>`
  cursor: pointer;
  padding: 25px;
  border: ${(props) =>
    props.isChecked ? '1px solid #000' : '1px solid #eeeeee'};
`;

const StyledWrapDepositItem = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const StyledDepositItem = styled.div<StyledDepositItemProps>`
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  width: calc(25% - 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  background-color: ${(props) => (props.isActive ? '#000' : 'none')};
  color: ${(props) => (props.isActive ? '#FFC200' : '#000')};
  margin: 5px;
  border: 1px solid #f4f4f4;
  &:hover {
    border: 1px solid #000;
  }
`;

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 25px;
    .title {
      border-bottom: 1px solid #c2c2c2;
      padding: 10px 0;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
    }
  }
`;
const StyledBankATM = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  background: #eeeeee;
  border-radius: 8px;
  margin-top: 10px;

  .item {
    display: flex;
    align-items: center;
    border-radius: 4px;
    width: 97px;
    height: 50px;
    justify-content: center;
    margin: 5px;
    background: #fff;
    position: relative;
  }
  .active {
    border: 1px solid #fcd535;
  }
  .tick {
    position: absolute;
    right: -10px;
    top: -10px;
  }
`;

const activeMenu = '6-2';
const homeUrl = 'https://shopdi.com.vn';
const Purchase = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const dispatch = useDispatch();

  const bankList = useSelector((state: RootState) => state.wallet.bankAccounts);
  const listBankTopup = useSelector(
    (state: RootState) => state.wallet.listBankTopup,
  );
  const [onSelectPrice, setOnSelectPrice] = useState('0');
  const [idChecked, setIdChecked] = useState<EnumPaymentMethodFE>(
    EnumPaymentMethodFE.BANKS,
  );
  const [isLoadingDeposit, setIsLoadingDeposit] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [error, setError] = useState('');
  const [selectedNode, setSelectedNode] = useState<NodeWallet | undefined>();

  const handleChange = (id: EnumPaymentMethodFE) => {
    setIdChecked(id);
  };

  useEffect(() => {
    dispatch(getShopdiBankAccount());
    dispatch(getListBankTopup());
  }, [dispatch]);

  const onDeposit = async () => {
    const amount = Number(onSelectPrice);
    try {
      setIsLoadingDeposit(true);
      setError('');
      if (idChecked === EnumPaymentMethodFE.BANKS) {
        const data = await topupWalletServices({
          amount,
          paymentMethod: EnumPaymentMethod.BANKS,
        });
        if (data.status && data.data.data.code) {
          setOrderCode(data.data.data.code ?? '');
        } else {
          setError(t.hasError);
        }
      } else {
        const data = await topupWalletServices({
          amount,
          paymentMethod: EnumPaymentMethod.ONLINE,
          redirectUrl: `${homeUrl}/user/wallet/deposit/result`,
          paymentVia: selectedNode?.partnerId,
          paymentDestinationId: selectedNode?.externalId,
        });
        if (data.status && data.data.data.paymentUrl) {
          router.replace(data.data.data.paymentUrl);
        } else {
          setError(t.hasError);
        }
      }

      setIsLoadingDeposit(false);
    } catch (error) {
      setIsLoadingDeposit(false);
      setError(t.hasError);
    }
  };

  const handleChangeInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/, '');

    if (Number(value) !== 0) {
      const result =
        value.substring(0, 1) === '0'
          ? value.substring(1, value.length)
          : value;
      setOnSelectPrice(result);
    }
    if (value === '') {
      setOnSelectPrice('0');
    }
  };

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />
        <div className="right-side">
          <div className="title mb-3 headline-01 text-uppercase">
            {idChecked === EnumPaymentMethodFE.BANKS && orderCode
              ? t.inforBankTransfer
              : t.depositCoin}
          </div>

          {idChecked === EnumPaymentMethodFE.BANKS && orderCode ? (
            <BankListDeposit
              orderCode={orderCode}
              bankList={bankList}
              price={
                FAKE_DEPOSIT.find((item) => String(item.id) === onSelectPrice)
                  ?.price ?? Number(onSelectPrice)
              }
              onFinished={() => router.push('/user/wallet/')}
            />
          ) : (
            <StyledWrapInner>
              <BannerWallet />
              <div className="text-gray2 mb-4 heading-04 text-uppercase">
                {t.selectCoinDeposit}:
              </div>
              <div className="input-amount mb-5">
                <input
                  className="input-text"
                  placeholder={t.inputCoinAmount}
                  type="number"
                  onChange={handleChangeInputAmount}
                  value={onSelectPrice}
                  min="0"
                  name="price"
                  id="price"
                  pattern="[0-9]"
                />
              </div>
              <div className="d-flex flex-wrap mb-4">
                {FAKE_DEPOSIT.map((item) => (
                  <StyledDepositItem
                    key={item.id}
                    isActive={String(item.price) === onSelectPrice}
                    onClick={() => setOnSelectPrice(String(item.price))}
                  >
                    {item.price} {t.coin}
                  </StyledDepositItem>
                ))}
              </div>
              <div className="text-gray2 mb-4 d-flex align-items-end mb-4">
                {t.amountDeposit}:
                <span className="ml-2 font-bold font-size20 mr-2">
                  {formatVietnamDong(Number(onSelectPrice) * 1000)}
                </span>
              </div>
              <div className="text-red mb-5">{t.hintDeposit}</div>
              <div className="heading-04 mb-5">{t.selectGate}</div>
              <div>
                <StyledWrapDepositItem>
                  <StyledShipType
                    htmlFor="bank"
                    className="d-flex align-items-center w-100 justify-content-between"
                    isChecked={idChecked === EnumPaymentMethodFE.BANKS}
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
                        <div className="font-size16 font-bold mb-2">
                          {t.transferBank}
                        </div>
                        <div className="text-gray3">{t.transferByBank}</div>
                      </div>
                    </div>
                  </StyledShipType>
                </StyledWrapDepositItem>
                <StyledWrapDepositItem>
                  <StyledShipType
                    className="d-flex align-items-center w-100 justify-content-between"
                    isChecked={idChecked === EnumPaymentMethodFE.WALLET}
                    htmlFor="wallet"
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
                        <img src="/svg/wallet-payment.svg" alt="payment" />
                      </div>
                      <div className="ml-3">
                        <div className="font-size16 font-bold mb-2">
                          {t.smartWallet}
                        </div>
                        <div className="text-gray3">
                          {t.transferBySmartWallet}
                        </div>
                      </div>
                    </div>
                  </StyledShipType>
                  {idChecked === EnumPaymentMethodFE.WALLET && (
                    <StyledBankATM className="flex-column">
                      {listBankTopup
                        .find((item) => item.node.id === 'WALLET')
                        ?.childrens.map((item) => (
                          <div className="d-flex align-items-center">
                            <div
                              className={`${
                                selectedNode?.id === item.node.id
                                  ? 'active'
                                  : ''
                              } item`}
                              onClick={() => setSelectedNode(item.node)}
                            >
                              <img src={item.node.image} alt="payment" />

                              {selectedNode?.id === item.node.id && (
                                <div className="tick">
                                  <img src="/svg/tickBank.svg" alt="payment" />
                                </div>
                              )}
                            </div>
                            <div className="font-bold ml-2">
                              {item.node.name}
                            </div>
                          </div>
                        ))}
                    </StyledBankATM>
                  )}
                </StyledWrapDepositItem>
                <StyledWrapDepositItem>
                  <StyledShipType
                    className="d-flex align-items-center w-100 justify-content-between"
                    isChecked={idChecked === EnumPaymentMethodFE.ATM}
                    htmlFor="atm"
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
                        <img src="/svg/cart-payment.svg" alt="payment" />
                      </div>
                      <div className="ml-3">
                        <div className="font-size16 font-bold mb-2">
                          {t.localBank}
                        </div>
                        <div className="text-gray3">
                          {t.transferByLocalBank}
                        </div>
                      </div>
                    </div>
                  </StyledShipType>
                  {idChecked === EnumPaymentMethodFE.ATM && (
                    <StyledBankATM>
                      {listBankTopup
                        .find((item) => item.node.id === 'ATM')
                        ?.childrens.map((item) => (
                          <div
                            className={`${
                              selectedNode?.id === item.node.id ? 'active' : ''
                            } item`}
                            onClick={() => setSelectedNode(item.node)}
                          >
                            <img src={item.node.image} alt="payment" />
                            {selectedNode?.id === item.node.id && (
                              <div className="tick">
                                <img src="/svg/tickBank.svg" alt="payment" />
                              </div>
                            )}
                          </div>
                        ))}
                    </StyledBankATM>
                  )}
                </StyledWrapDepositItem>
                <StyledWrapDepositItem>
                  <StyledShipType
                    className="d-flex align-items-center w-100 justify-content-between"
                    isChecked={idChecked === EnumPaymentMethodFE.VISA}
                    htmlFor="visa"
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
                        <img src="/svg/visa-payment.svg" alt="payment" />
                      </div>
                      <div className="ml-3">
                        <div className="font-size16 font-bold mb-2">
                          Visa/Master
                        </div>
                        <div className="text-gray3">{t.transferByVisa}</div>
                      </div>
                    </div>
                  </StyledShipType>
                  {idChecked === EnumPaymentMethodFE.VISA && (
                    <StyledBankATM className="flex-column">
                      {listBankTopup
                        .find((item) => item.node.id === 'VISAMASTERCARD')
                        ?.childrens.map((item) => (
                          <div className="d-flex align-items-center">
                            <div
                              className={`${
                                selectedNode?.id === item.node.id
                                  ? 'active'
                                  : ''
                              } item`}
                              onClick={() => setSelectedNode(item.node)}
                            >
                              <img src={item.node.image} alt="payment" />

                              {selectedNode?.id === item.node.id && (
                                <div className="tick">
                                  <img src="/svg/tickBank.svg" alt="payment" />
                                </div>
                              )}
                            </div>
                            <div className="font-bold ml-2">
                              {item.node.name}
                            </div>
                          </div>
                        ))}
                    </StyledBankATM>
                  )}
                </StyledWrapDepositItem>
              </div>
              <div
                className={`d-flex mt-4 align-items-center ${
                  error ? 'justify-content-between' : 'justify-content-end'
                }`}
              >
                {error && <div className="text-red">{error}</div>}

                <button
                  type="button"
                  className="px-5 py-3 button button-primary"
                  onClick={onDeposit}
                  disabled={
                    isLoadingDeposit ||
                    (EnumPaymentMethodFE.BANKS !== idChecked &&
                      selectedNode === undefined) ||
                    onSelectPrice === '0' ||
                    onSelectPrice === ''
                  }
                >
                  {t.deposit}
                </button>
              </div>
            </StyledWrapInner>
          )}
        </div>
      </StyledWrap>
    </div>
  );
};

export default Purchase;
