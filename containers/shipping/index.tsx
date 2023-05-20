import { Checkbox } from 'antd';
import DeleteAddress from 'components/address/DeleteAddress';
import ManageAddress from 'components/address/ManageAddress';
import TypeLabel from 'components/address/TypeLabel/TypeLabel';
import CartTab from 'components/cart/CartTab';
import ItemCartRight from 'components/checkout/ItemCartRight';
import ShipTypeItem from 'components/checkout/ShipTypeItem';
import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import FormPopup from 'components/common/FormPopup';
import InputCustom from 'components/common/Input';
import InputAddress from 'components/inputAddress';
import ShippingAddress, {
  UpdateShippingAddressData,
} from 'components/users/ShippingAddress';
import { validationSchema } from 'containers/user/account/ProfileContainer';
import { useFormik } from 'formik';
import { CalculatorShipPriceResponse } from 'interfaces/response/order';
import { ProductItem } from 'interfaces/response/products';
import { AddressEntity } from 'interfaces/types/user';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
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
import { RootState } from 'redux/reducer';
import { getCartBiddingItems, getCartItems } from 'services/cart';
import { calculatorShippingPrice } from 'services/order';
import { formatVietnamDong } from 'utils';

const ShippingContainer: React.FC<PropsFromRedux> = ({
  carts,
  cartsBidding,
  setReponseDataCartAction,
  setReponseDataBiddingCartAction,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [total, setTotal] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const user = useSelector((state: RootState) => state.user.profile);
  const isLoadingShippingAddress = useSelector(
    (state: RootState) => state.user.isLoadings.getAddress,
  );
  const dispatch = useDispatch();
  const [isBuyNow, setIsBuyNow] = useState(false);
  const shippingAddressList = useSelector(
    (state: RootState) => state.user.shippingAddress,
  );
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
  const [shippingList, setShippingList] = useState<
    CalculatorShipPriceResponse[]
  >([]);
  const [priceShip, setPriceShip] = useState(0);
  const [idCheckedShippingType, setIdCheckedShippingType] = useState('');
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isOverPriceShip, setIsOverPriceShip] = useState('');

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

  const handleCheckout = () => {
    if (shippingAddressList.length > 0) {
      // router.push(`/checkout/?isBuyNow=${isBuyNow ? '1' : '0'}`);
      router.push('/checkout');
    } else {
      setCreateAddressPopup(true);
    }
  };
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

  const onCheckedTypeShipping = (id: string) => {
    setIdCheckedShippingType(id);
  };

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

  const checkDisabledButton = () => {
    if (isBuyNow) {
      return carts?.every((item) => item.items.every((c) => !c.sync));
    }

    return cartsBidding?.every((item) => item.items.every((c) => !c.sync));
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
    <div className="shipping mt-5">
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
          <div className="mb-2 mt-4">{t.address}</div>
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
      <CartTab active={2} isBuyNow={isBuyNow} />
      <div className="container">
        <div className="flex-column-mobile change-order-mobile">
          <div className="left">
            <div className="title-page headline-01">{t.inforShipping}</div>
            <div>
              {selectAddress ? (
                <div className="p-4 box-address border-cart d-flex justify-content-between">
                  <div>
                    <div className="mb-3 font-bold">
                      <span className="text-uppercase">
                        {selectAddress.name}{' '}
                      </span>{' '}
                      | {selectAddress.phone}
                    </div>
                    <div className="text-gray2">
                      {`${
                        selectAddress.address ? `${selectAddress.address},` : ''
                      } ${
                        selectAddress.wardName
                          ? `${selectAddress.wardName},`
                          : ''
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
                    <div className="mt-4">
                      <span
                        className="cursor-pointer mt-4 border-bottom-gray"
                        onClick={() => setManageAddress(true)}
                      >
                        {t.change}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-shrink-0 ml-2 hide-mobile">
                    {selectAddress.isDefault && <TypeLabel label={t.default} />}
                    <div className="mlt-2">
                      <TypeLabel
                        label={
                          selectAddress.type === 0
                            ? t.home
                            : selectAddress.type === 1
                            ? t.office
                            : t.orther
                        }
                        name={selectAddress.type === 0 ? 'home' : 'office'}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 mt-3">
                  <SkeletonTheme baseColor="#ffffff">
                    <p>
                      <Skeleton count={1} height={88} borderRadius={2} />
                    </p>
                  </SkeletonTheme>
                </div>
              )}

              <div className="title-page headline-01">
                {t.selectTypeShipping}
              </div>

              {shippingList.length ? (
                <div className="mb-4 border-cart">
                  {shippingList.map((item) =>
                    item.service.map((ship) => (
                      <ShipTypeItem
                        key={ship.name}
                        checked={ship.name === idCheckedShippingType}
                        onChecked={onCheckedTypeShipping}
                        type={ship.service}
                        timeDelivery={ship.delivery}
                        shipper={item.name}
                        id={ship.name}
                        price={ship.fee}
                      />
                    )),
                  )}
                </div>
              ) : (
                <SkeletonTheme baseColor="#f4f4f4">
                  <p>
                    <Skeleton count={1} height={88} borderRadius={2} />
                  </p>
                </SkeletonTheme>
              )}
            </div>

            {/* <div className="d-flex align-items-center w-100 px-3 py-4 border-bottom">
                <div className="col-lg-4">Phí vận chuyển</div>
                <div className="col-lg-4 text-right">{formatVietnamDong(priceShip)}</div>
              </div> */}
            <div className="d-flex justify-content-end mt-5">
              <button
                type="button"
                className="button button-primary size-l w-300"
                disabled={checkDisabledButton()}
                onClick={handleCheckout}
              >
                {t.checkoutNow}
              </button>
            </div>
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

            {/* <Coupon /> */}
            <div className="d-flex align-items-center w-100 px-3 py-3 justify-content-between">
              <div>{t.preSum}</div>
              <div>
                <b>{formatVietnamDong(total)}</b>
              </div>
            </div>
            {/* <div className="d-flex align-items-center w-100 px-3 py-3 justify-content-between">
              <div>Mã khuyến mãi</div>
              <div>
                <b>{formatVietnamDong(0)}</b>
              </div>
            </div> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

interface ShippingContainerProps {
  products?: ProductItem[];
}
const mapStateToProps = (
  state: RootState,
  ownProps: ShippingContainerProps,
) => ({
  ...ownProps,
  products: state.cart.products,
  carts: state?.cart?.data,
  cartsBidding: state?.cart?.dataBidding,
});
const connector = connect(mapStateToProps, {
  setReponseDataCartAction: setReponseDataCart,
  setReponseDataBiddingCartAction: setReponseDataBiddingCart,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ShippingContainer);
