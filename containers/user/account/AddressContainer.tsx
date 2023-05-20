import { Checkbox } from 'antd';
import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import FormPopup from 'components/common/FormPopup';
import InputCustom from 'components/common/Input';
import InputAddress from 'components/inputAddress';
import LeftSide from 'components/users/LeftSide';
import ShippingAddressSquare, {
  UpdateShippingAddressData,
} from 'components/users/ShippingAddressSquare';
import { validationSchema } from 'containers/user/account/ProfileContainer';
import { useFormik } from 'formik';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createShippingAddress,
  deleteShippingAddress,
  getShippingAddress,
  updateShippingAddress,
} from 'redux/action/user';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import TypeLabel from 'components/address/TypeLabel/TypeLabel';

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 17px 25px 25px 25px;
    .title {
      border-bottom: 1px solid #C2C2C2; 
      padding:10px 0;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
 }
    }
  }
  }
`;

const activeMenu = '1-2';

const AddressContainer = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const shippingAddressList = useSelector(
    (state: RootState) => state.user.shippingAddress,
  );
  const profileData = useSelector((state: RootState) => state.user.profile);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [createAddressPopup, setCreateAddressPopup] = useState(false);
  const [onEditAddress, setOnEditAddress] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
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

  const onUpdateAddress = (params: UpdateShippingAddressData) => {
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
    if (profileData?.userId) {
      dispatch(getShippingAddress());
    }
  }, [dispatch, profileData?.userId]);

  return (
    <div className="container">
      {confirmDeletePopup && (
        <ConfirmPopup
          onCancel={() => setConfirmDeletePopup(false)}
          onConfirm={() => {
            dispatch(deleteShippingAddress(onEditAddress));
            setConfirmDeletePopup(false);
          }}
          title={t.deleteAddress}
        >
          {' '}
          <div className="text-center mb-3">
            <img src="/svg/trash.svg" alt="trash" />
          </div>
          <div className="text-center font-size20">{t.confirmDelete}</div>
          <div className="text-center mt-2">{t.cannotRecoverAddress}</div>
        </ConfirmPopup>
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
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="d-flex justify-content-between align-items-center mb-4 title pb-2">
            <div className="font-bold headline-01">{t.myAddress}</div>

            <button
              type="button"
              className="button button-primary py-3 px-4 d-flex align-items-center"
              onClick={() => setCreateAddressPopup(true)}
            >
              <Icon name="plus" color="#FFC200" />
              <span className="ml-2 text-orange">{t.addMoreAddress}</span>
            </button>
          </div>
          {shippingAddressList.length > 0 && (
            <div className="d-flex flex-wrap">
              {shippingAddressList.map((item) => (
                <ShippingAddressSquare
                  // eslint-disable-next-line no-nested-ternary
                  label={
                    item.type === 0
                      ? t.home
                      : item.type === 1
                      ? t.office
                      : t.orther
                  }
                  key={item.id}
                  onDeleteAddress={(id) => {
                    setOnEditAddress(id);
                    setConfirmDeletePopup(true);
                  }}
                  onUpdate={onUpdateAddress}
                  {...item}
                />
              ))}
            </div>
          )}
        </div>
      </StyledWrap>
    </div>
  );
};

export default AddressContainer;
