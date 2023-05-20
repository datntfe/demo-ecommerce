import { Checkbox } from 'antd';
import DeleteAddress from 'components/address/DeleteAddress';
import ManageAddress from 'components/address/ManageAddress';
import TypeLabel from 'components/address/TypeLabel/TypeLabel';
import CartTab from 'components/cart/CartTab';
import ItemCartRight from 'components/checkout/ItemCartRight';
import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import FormPopup from 'components/common/FormPopup';
import InputCustom from 'components/common/Input';
import InputVoucher from 'components/common/InputVoucher/InputVoucher';
import InputAddress from 'components/inputAddress';
import BankListDeposit from 'components/users/BankListDeposit';
import ShippingAddress, {
  UpdateShippingAddressData,
} from 'components/users/ShippingAddress';
import { validationSchema } from 'containers/user/account/ProfileContainer';
import { useFormik } from 'formik';
import {
  CalculatorShipPriceResponse,
  IResquestCreateOrder,
} from 'interfaces/response/order';
import {
  EnumPaymentMethod,
  EnumPaymentMethodFE,
  NodeWallet,
} from 'interfaces/response/wallet';
import { AddressEntity } from 'interfaces/types/user';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import {
  setReponseDataBiddingCart,
  setReponseDataCart,
} from 'redux/action/cart';
import {
  createShippingAddress,
  deleteShippingAddress,
  getShippingAddress,
  updateShippingAddress,
} from 'redux/action/user';
import { getListBankTopup, getShopdiBankAccount } from 'redux/action/wallet';
import { RootState } from 'redux/reducer';
import { getCartBiddingItems, getCartItems } from 'services/cart';
import {
  calculatorShippingPrice,
  submitBiddingOrder,
  submitOrder,
} from 'services/order';
import { formatVietnamDong } from 'utils';
import MethodPayments from './components/MethodPayments';

const homeUrl = 'https://shopdi.com.vn';

const CheckoutContainer: React.FC<PropsFromRedux> = ({
  carts,
  getListBankTopupAction,
  cartsBidding,
  setReponseDataCartAction,
  setReponseDataBiddingCartAction,
}) => {
  const bankList = useSelector((state: RootState) => state.wallet.bankAccounts);
  const [idCheckedShippingType, setIdCheckedShippingType] = useState('');
  const [isBusySubmit, setIsBusySubmit] = useState(false);
  const [idMethodChecked, setIdMethodChecked] = useState<EnumPaymentMethodFE>(
    EnumPaymentMethodFE.COD,
  );
  const [error, setError] = useState('');
  const [selectedNode, setSelectedNode] = useState<NodeWallet | undefined>();
  const [totalWeight, setTotalWeight] = useState(0);
  const [total, setTotal] = useState(0);
  const [priceShip, setPriceShip] = useState(0);
  const [isOverPriceShip, setIsOverPriceShip] = useState('');
  const [shippingList, setShippingList] = useState<
    CalculatorShipPriceResponse[]
  >([]);
  const [orderCode, setOrderCode] = useState('');
  // const [alertWip, setAlertWip] = useState(false);

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const onCheckedTypeShipping = (id: string) => {
    setIdCheckedShippingType(id);
  };

  const user = useSelector((state: RootState) => state.user.profile);
  const shippingAddressList = useSelector(
    (state: RootState) => state.user.shippingAddress,
  );
  const isLoadingShippingAddress = useSelector(
    (state: RootState) => state.user.isLoadings.getAddress,
  );
  const dispatch = useDispatch();
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [createAddressPopup, setCreateAddressPopup] = useState(false);
  const [manageAddress, setManageAddress] = useState(false);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [onEditAddress, setOnEditAddress] = useState('');
  const [selectAddress, setSelectAddress] = useState<AddressEntity | undefined>(
    undefined,
  );
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [coupon, setCoupon] = useState('');
  const resetField = () => {
    formik.resetForm();
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setOnEditAddress('');
  };
  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      phone: '',
      address: '',
      type: 0,
      isDefault: false,
    },
    onSubmit: async (values) => {
      if (!selectedProvince || !selectedDistrict || !selectedWard) {
        return;
      }
      if (!onEditAddress) {
        dispatch(
          createShippingAddress({
            name: values.name,
            phone: values.phone,
            address: values.address,
            type: values.type,
            isDefault:
              shippingAddressList.length === 0 ? true : values.isDefault,
            provinceId: selectedProvince,
            districtId: selectedDistrict,
            wardId: selectedWard,
          }),
        );
      } else {
        dispatch(
          updateShippingAddress(onEditAddress, {
            name: values.name,
            phone: values.phone,
            address: values.address,
            type: values.type,
            isDefault:
              shippingAddressList.length === 1 ? true : values.isDefault,
            provinceId: selectedProvince,
            districtId: selectedDistrict,
            wardId: selectedWard,
          }),
        );
      }

      setCreateAddressPopup(false);
      resetField();
    },
  });

  useEffect(() => {
    if (
      shippingAddressList.length === 0 &&
      !isLoadingShippingAddress &&
      user?.userId
    ) {
      setCreateAddressPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddressList, isLoadingShippingAddress]);

  useEffect(() => {
    setSelectAddress(shippingAddressList.find((item) => item.isDefault));
  }, [shippingAddressList]);

  const onUpdateAddress = (params: UpdateShippingAddressData) => {
    // setManageAddress(false);
    formik.setFieldValue('name', params.name);
    formik.setFieldValue('phone', params.phone);
    formik.setFieldValue('address', params.address);
    formik.setFieldValue('type', params.type);
    formik.setFieldValue('isDefault', params.isDefault);
    setSelectedProvince(params.provinceId);
    setSelectedDistrict(params.districtId);
    setSelectedWard(params.wardId);
    setCreateAddressPopup(true);
    setOnEditAddress(params.id);
  };

  const handlePurchase = async () => {
    if (!selectAddress?.id) {
      return setCreateAddressPopup(true);
    }
    try {
      setIsBusySubmit(true);
      setError('');
      if (idMethodChecked === EnumPaymentMethodFE.BANKS) {
        const data = await submitOrder({
          userAddressId: selectAddress?.id || 0,
          shippingMethod: 0,
          deliveryTimeId: 1,
          paymentMethod: 5,
          couponCode: '',
        } as IResquestCreateOrder);
        if (data.status && data.data.data.code) {
          setOrderCode(data.data.data.code ?? '');
        } else {
          setError(data.data.message ?? t.hasError);
        }
      }
      if (idMethodChecked === EnumPaymentMethodFE.COD) {
        const data = await submitBiddingOrder({
          userAddressId: selectAddress?.id || 0,
          shippingMethod: 0,
          deliveryTimeId: 1,
          paymentMethod: EnumPaymentMethod.BANKS,
          couponCode: '',
        } as IResquestCreateOrder);
        if (data.status && data.data.data.code) {
          router.push(
            `/my-order/result?Status=00&ServiceOrderId=${data.data.data.code}`,
          );
        } else {
          setError(data.data.message ?? t.hasError);
        }
      }
      if (idMethodChecked === EnumPaymentMethodFE.MBBANK) {
        const data = await submitBiddingOrder({
          userAddressId: selectAddress?.id || 0,
          shippingMethod: 0,
          deliveryTimeId: 1,
          paymentMethod: EnumPaymentMethod.MBBANK,
          couponCode: '',
          paymentDestinationId: 'mb',
          redirectUrl: `${homeUrl}/my-order/result`,
        } as IResquestCreateOrder);
        if (data.status && data.data.data.paymentUrl) {
          router.replace(data.data.data.paymentUrl);
        } else {
          setError(data.data.message ?? t.hasError);
        }
      }
      const data = await submitBiddingOrder({
        userAddressId: selectAddress?.id || 0,
        shippingMethod: 0,
        deliveryTimeId: 1,
        paymentMethod: EnumPaymentMethod.ONLINE,
        couponCode: '',
        redirectUrl: `${homeUrl}/my-order/result`,
        paymentVia: selectedNode?.partnerId,
        paymentDestinationId: selectedNode?.externalId,
      } as IResquestCreateOrder);
      if (data.status && data.data.data.paymentUrl) {
        router.replace(data.data.data.paymentUrl);
      } else {
        setError(data.data.message ?? t.hasError);
      }
      setIsBusySubmit(false);
    } catch (error) {
      setIsBusySubmit(false);
      setError(t.hasError);
    }
  };

  useEffect(() => {
    let total = 0;
    let totalWeight = 0;
    if (isBuyNow) {
      carts?.map((store) => {
        store.items
          .filter((f) => f.sync)
          .map((item) => {
            total += item.total;
            totalWeight += item.weight * item.qty;
            return null;
          });
        return store;
      });
    } else {
      cartsBidding?.map((store) => {
        store.items
          .filter((f) => f.sync)
          .map((item) => {
            total += item.total;
            totalWeight += item.weight * item.qty;
            return null;
          });
        return store;
      });
    }
    setTotal(total);
    setTotalWeight(totalWeight);
  }, [carts, cartsBidding, isBuyNow]);

  useEffect(() => {
    if (!selectAddress) {
      return;
    }
    const getShippingPrice = async () => {
      try {
        const data = await calculatorShippingPrice({
          receiver_province: selectAddress?.provinceName ?? '',
          receiver_district: selectAddress?.districtName ?? '',
          weight: totalWeight,
          value: total,
        });
        if (data.data.status) {
          setPriceShip(data.data.data[0].service[0].fee);
          setIdCheckedShippingType(data.data.data[0].service[0].name);
          setShippingList(data.data.data);
        } else {
          setIsOverPriceShip(data.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getShippingPrice();
  }, [selectAddress, totalWeight]);

  useEffect(() => {
    getListBankTopupAction();
    dispatch(getShopdiBankAccount());
  }, []);

  useEffect(() => {
    if (isLoadingCart) {
      return;
    }

    switch (router.query.isBuyNow) {
      case '0': {
        if (cartsBidding.length === 0) {
          router.push('/');
          break;
        }
        let checkItem = 0;
        cartsBidding?.map((store) => {
          store.items
            .filter((f) => f.sync)
            .map((item) => {
              checkItem++;
            });
        });
        if (checkItem === 0) {
          router.push('/cart');
        }

        break;
      }

      case '1': {
        if (carts.length === 0) {
          router.push('/');
          break;
        }
        let checkItem = 0;
        carts?.map((store) => {
          store.items
            .filter((f) => f.sync)
            .map((item) => {
              checkItem++;
            });
        });
        if (checkItem === 0) {
          router.push('/cart');
        }
        break;
      }

      default:
        break;
    }
  }, [carts, cartsBidding, isLoadingCart]);

  useEffect(() => {
    if (!user || !isBuyNow) {
      return;
    }
    setIsLoadingCart(true);
    getCartItems().then((response) => {
      const { data } = response;
      setReponseDataCartAction(data.data as any);
      setIsLoadingCart(false);
    });
  }, [router.pathname, user, isBuyNow]);

  useEffect(() => {
    if (!user || isBuyNow) {
      return;
    }
    setIsLoadingCart(true);
    getCartBiddingItems().then((response) => {
      const { data } = response;
      setReponseDataBiddingCartAction(data.data as any);
      setIsLoadingCart(false);
    });
  }, [router.pathname, user, isBuyNow]);

  const handleCoupon = async () => {
    setCoupon('');
    setTimeout(() => {
      toast.error(t.voucherExpired);
    }, 300);
  };
  useEffect(() => {
    if (user?.userId) {
      dispatch(getShippingAddress());
    }
  }, [dispatch, user?.userId]);

  // useEffect(() => {
  //   if (router.query.isBuyNow === '0') {
  //     setIsBuyNow(false);
  //   }
  // }, [router.query.isBuyNow]);

  return (
    <div>
      {/* {alertWip && (
        <ConfirmPopup
          onCancel={() => setAlertWip(false)}
          onConfirm={() => {
            handlePurchase();
            setAlertWip(false);
          }}
          buttonConfirmContent={t.gotIt}
        >
          <div className="text-center mb-3">
            <img src="/svg/alert-red.svg" alt="icon" />
          </div>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: t.betaAlert }}
          />
        </ConfirmPopup>
      )} */}

      {isOverPriceShip && (
        <ConfirmPopup
          header={false}
          onConfirm={() => router.push('/cart')}
          buttonConfirmContent="Cập nhật giỏ hàng"
        >
          <div className="text-center mb-3">
            <img src="/svg/alert-red.svg" alt="icon" />
          </div>
          <div
            className="text-center"
            // dangerouslySetInnerHTML={{ __html: t.betaAlert }}
          >
            {isOverPriceShip}
          </div>
        </ConfirmPopup>
      )}

      {confirmDeletePopup && (
        <DeleteAddress
          onCancel={() => setConfirmDeletePopup(false)}
          onConfirm={() => {
            dispatch(deleteShippingAddress(onEditAddress));
            setConfirmDeletePopup(false);
          }}
        />
      )}

      {manageAddress && (
        <ManageAddress
          onCancel={() => {
            setManageAddress(false);
            resetField();
          }}
          onConfirm={() => formik.handleSubmit()}
          shippingAddressList={shippingAddressList}
          onDeleteAddress={(id) => {
            setOnEditAddress(id);
            setConfirmDeletePopup(true);
          }}
          onUpdateAddress={onUpdateAddress}
          selectAddress={selectAddress}
          onChecked={(item) => {
            setSelectAddress(item);
            setManageAddress(false);
          }}
          addMoreAddress={() => setCreateAddressPopup(true)}
        />
      )}
      {createAddressPopup && (
        <FormPopup
          button={onEditAddress ? t.confirm : t.shippingToAddress}
          onCancel={() => {
            setCreateAddressPopup(false);
            resetField();
          }}
          buttonCancel={onEditAddress ? t.cancel : t.closed}
          onConfirm={() => formik.handleSubmit()}
          title={onEditAddress ? t.editAddress : t.addMoreAddress}
          width={800}
          zIndex={100}
        >
          <div className="d-flex mt-4">
            <div className="w-50">
              <div className="mb-2">{t.fullName}</div>
              <div className="relative">
                <InputCustom
                  type="text"
                  placeholder={t.fullName}
                  onChange={formik.handleChange}
                  name="name"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  value={formik.values.name}
                  maxLength={30}
                />
              </div>
              {formik.touched.name && Boolean(formik.errors.name) && (
                <div className="text-red mt-2 font-size13">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="w-50 ml-4">
              <div className="mb-2">{t.phoneNumber}</div>
              <div className="relative">
                <InputCustom
                  type="text"
                  placeholder={t.inputPhoneNumber}
                  onChange={formik.handleChange}
                  name="phone"
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  value={formik.values.phone}
                  maxLength={14}
                />
              </div>
              {formik.touched.phone && Boolean(formik.errors.phone) && (
                <div className="text-red mt-2 font-size13">
                  {t.pleaseInputPhone}
                </div>
              )}
            </div>
          </div>
          <div className="mb-2 mt-4">{t.fullAddress}</div>
          <div className="relative">
            <InputAddress
              selectedProvince={selectedProvince}
              selectedDistrict={selectedDistrict}
              selectedWard={selectedWard}
              setSelectedProvince={setSelectedProvince}
              setSelectedDistrict={setSelectedDistrict}
              setSelectedWard={setSelectedWard}
              error={
                (!selectedProvince || !selectedDistrict || !selectedWard) &&
                formik.touched.address
              }
            />
          </div>
          {(!selectedProvince || !selectedDistrict) &&
            formik.touched.address && (
              <div className="text-red mt-2 font-size13">
                {t.inputFullAddress}
              </div>
            )}
          <div className="mb-2 mt-4">Địa chỉ</div>
          <div className="relative">
            <InputCustom
              type="text"
              placeholder={t.inputAddress}
              onChange={formik.handleChange}
              name="address"
              error={formik.touched.address && Boolean(formik.errors.address)}
              value={formik.values.address}
              maxLength={50}
            />
          </div>
          {formik.touched.address && Boolean(formik.errors.address) && (
            <div className="text-red mt-2 font-size13">
              {formik.errors.address}
            </div>
          )}
          <div className="mb-2 mt-4">{t.typeAddress}</div>
          <div className="d-flex align-items-center mb-4">
            <div className="mr-3">
              <TypeLabel
                label={t.home}
                isActive={formik.values.type === 0}
                onClick={() => formik.setFieldValue('type', 0)}
                name="home"
              />
            </div>
            <div className="mr-3">
              <TypeLabel
                label={t.office}
                isActive={formik.values.type === 1}
                onClick={() => formik.setFieldValue('type', 1)}
                name="office"
              />
            </div>
            <div className="mr-3">
              <TypeLabel
                label={t.orther}
                isActive={formik.values.type === 2}
                onClick={() => formik.setFieldValue('type', 2)}
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Checkbox
              type="checkbox"
              onChange={formik.handleChange}
              name="isDefault"
              checked={formik.values.isDefault}
            />
            <div className="ml-3">{t.setDefaultAddress}</div>
          </div>
        </FormPopup>
      )}

      <div className="container mt-5 checkout mb-5">
        <CartTab active={3} isBuyNow={isBuyNow} />
        <div className="flex-column-mobile change-order-mobile">
          <div className="left">
            {idMethodChecked === EnumPaymentMethodFE.BANKS && orderCode ? (
              <BankListDeposit
                orderCode={orderCode}
                bankList={bankList}
                price={total + priceShip}
                onFinished={() =>
                  router.push(
                    `/my-order/result?Status=00&ServiceOrderId=${orderCode}`,
                  )}
              />
            ) : (
              <div>
                <div className="title-page headline-01">{t.pickPayment}</div>

                <MethodPayments
                  idChecked={idMethodChecked}
                  handleChange={(id) => setIdMethodChecked(id)}
                  setSelectedNode={setSelectedNode}
                  selectedNode={selectedNode}
                />

                <div
                  className={`d-flex mt-4 align-items-center mt-5 mb-5 ${
                    error ? 'justify-content-between' : 'justify-content-end'
                  }`}
                >
                  {error && <div className="text-red">{error}</div>}
                  {error ? (
                    <button
                      type="button"
                      style={{
                        width: '350px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                      }}
                      onClick={() => router.push('/cart')}
                      className="button button-primary text-uppercase"
                    >
                      {t.backToCart}
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{
                        width: '350px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                      }}
                      onClick={handlePurchase}
                      disabled={
                        isBusySubmit ||
                        (![
                          EnumPaymentMethodFE.BANKS,
                          EnumPaymentMethodFE.COD,
                          EnumPaymentMethodFE.MBBANK,
                        ].includes(idMethodChecked) &&
                          selectedNode === undefined) ||
                        total === 0
                      }
                      className="button button-primary size-l w-300"
                    >
                      {isBusySubmit ? t.statusPending : t.checkout}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <div className="title-page mb-4 text-uppercase headline-01">
              {t.orderSumary}&nbsp;(
              {cartsBidding.reduce((a, b) => a + b.items.length, 0)} {t.product}
              )
            </div>
            <div className="wrap-items-summary">
              {isBuyNow
                ? carts?.map((item) => (
                    <div className="py-2 border-bottom-gray mb-5">
                    {item.items
                        .filter((f) => f.sync)
                        .map((i) => (
                          <ItemCartRight
                            price={i.price}
                            name={i.name}
                            qty={i.qty}
                            image={i.image}
                            key={i.cartId}
                          />
                        ))}
                  </div>
                  ))
                : cartsBidding?.map((item, index) => {
                    if (item.items.filter((f) => f.sync).length === 0) {
                      return null;
                    }
                    return (
                      <div
                        className={`py-2 border-bottom-gray ${
                          index === cartsBidding.length - 1 ? '' : 'mb-5'
                        }`}
                      >
                        {item.items
                          .filter((f) => f.sync)
                          .map((i) => (
                            <ItemCartRight
                              price={i.price}
                              name={i.name}
                              qty={i.qty}
                              image={i.image}
                              key={i.cartId}
                            />
                          ))}
                      </div>
                    );
                  })}
            </div>

            <div className="mb-3 mt-5">
              <InputVoucher
                setVoucherCode={(e) => setCoupon(e)}
                isLoading={coupon === ''}
                onClick={handleCoupon}
              />
            </div>
            <div className="d-flex align-items-center w-100 px-3 py-3 justify-content-between">
              <div>{t.preSum}</div>
              <div>
                <b>{formatVietnamDong(total)}</b>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 px-3 py-3 justify-content-between">
              <div>{t.couponCode}</div>
              <div>
                <b>{formatVietnamDong(0)}</b>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 px-3 py-3 justify-content-between border-bottom-gray">
              <div>{t.shippingFee}</div>
              <div>
                <b>{formatVietnamDong(priceShip)}</b>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 px-3 py-4 justify-content-between">
              <div>
                <b>{t.total}</b>
              </div>
              <div>
                <b>{formatVietnamDong(total + priceShip)}</b>
              </div>
            </div>
            <div className="d-flex align-items-center w-100 py-3 justify-content-between">
              <div className="font-bold">{t.shippingAddress}</div>
              <div>
                <span
                  className="cursor-pointer mt-4 border-bottom-gray"
                  onClick={() => setManageAddress(true)}
                >
                  {t.change}
                </span>
              </div>
            </div>
            {selectAddress && (
              <div className="p-4 box-address border-cart">
                <div className="bold mb-3 font-bold">
                  <span className="text-uppercase">{selectAddress.name} </span>{' '}
                  | {selectAddress.phone}
                </div>
                <div className="">
                  {`${
                    selectAddress.address ? `${selectAddress.address},` : ''
                  } ${
                    selectAddress.wardName ? `${selectAddress.wardName},` : ''
                  } ${
                    selectAddress.districtName
                      ? `${selectAddress.districtName},`
                      : ''
                  } ${
                    selectAddress.provinceName
                      ? `${selectAddress.provinceName}`
                      : ''
                  }`}
                </div>
              </div>
            )}
            <div className="d-flex align-items-center w-100 py-3 justify-content-between">
              <div className="font-bold">{t.shippingType}</div>
              {/* <div>
                <span className="cursor-pointer mt-4 border-bottom-gray" onClick={() => setManageAddress(true)}>
                  Thay đổi
                </span>
              </div> */}
            </div>
            <div className="border-cart p-4">
              <div className="font-bold">{t.express}</div>
              <div>{t.aboutDate}</div>
              <div>
                {t.shippedBy} SupperShip | {t.allowToCheckOrder}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartContainerProps {}
const mapStateToProps = (state: RootState, ownProps: CartContainerProps) => ({
  ...ownProps,
  carts: state?.cart?.data,
  cartsBidding: state?.cart?.dataBidding,
});
const connector = connect(mapStateToProps, {
  getListBankTopupAction: getListBankTopup,
  setReponseDataCartAction: setReponseDataCart,
  setReponseDataBiddingCartAction: setReponseDataBiddingCart,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CheckoutContainer);
