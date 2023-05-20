import InputCustom from 'components/common/Input';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  upDateUserAvatar,
  upDateUserProfile,
  UPDATE_USER_PROFILE,
} from 'redux/action/user';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';
import * as yup from 'yup';
// eslint-disable-next-line import/no-duplicates
import { isValid, parse } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import FormPopup from 'components/common/FormPopup';
import Icon from 'components/common/Icon';
import LeftSide from 'components/users/LeftSide';
import OTPForm from 'containers/register/components/OTPForm';
import { enGB } from 'date-fns/locale';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { requestAddPhoneNumber, submitAddPhoneNumber } from 'services/user';
import 'yup-phone';
import GoogleLogin from 'react-google-login';
import FacebookLogin, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login/dist/facebook-login-render-props';
import { connectSSo, removeSSo } from 'services/authencation';

function isValidDate(day: string, month: string, year: string) {
  const parsed = parse(`${day}/${month}/${year}`, 'P', new Date(), {
    locale: enGB,
  });
  return isValid(parsed);
}

const StyledWrap = styled.div`
  @media only screen and (max-width: 1199px) {
    margin-bottom: 30px;
    margin-top: 30px;
  }
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
    .button-200-responsive {
      width: 200px;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
      .button-200-responsive {
        width: 240px;
        margin-bottom: 10px;
      }
    }
  }
  .bg-gray4 {
    background: #eeeeee;
    border-radius: 10px;
  }
  .select {
    background: #ffffff;
    padding: 9px 10px;
    width: 105px;
  }
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .PhoneInputInput {
    border: none;
    width: 60px;
    line-height: 1em;
    font-weight: 700;
  }
  .PhoneInputInput:disabled {
    background: none;
  }
  .PhoneInput {
    width: 120px;
    display: flex;
    align-items: center;
    border-right: 1px solid #cccccc;
    font-size: 16px;
    padding: 10px 0px;
  }
  .input-phone {
    border: 1px solid #1a1a1a;
    padding: 7px 15px;
    display: flex;
    align-items: center;
    border-radius: 8px;
  }
  .input-phone.error-input {
    border: 1px solid $danger;
  }
  .input-short {
    border: none;
    width: 100%;
    padding-left: 10px;
    font-size: 16px;
    line-height: 1em;
  }
  .input-login {
    padding: 17px 10px;
    border-radius: 8px;
  }
`;
export const StyledBox = styled.div`
  @media only screen and (max-width: 1199px) {
    padding: 10px 0px;
  }
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  .avatar {
    position: relative;
    display: flex;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    img {
      vertical-align: middle;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    &:hover {
      .icon-camera {
        opacity: 1;
      }
    }
  }
  .icon-camera {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0;
  }

  .labelChange {
    font-size: 12px;
    color: #2972fe;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .label-button {
    border-radius: 26px;
    font-size: 12px;
    padding: 4px 12px;
    &.default {
      color: #888888;
      background: #eeeeee;
    }
    &.active {
      background: #23a757;
      color: #fff;
    }
  }
`;

const renderDate = (from: number, to: number) => {
  const result = [];
  for (let index = from; index <= to; index++) {
    result.push(
      <option value={index} key={index}>
        {index}
      </option>,
    );
  }
  return result;
};

export const validationSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
  name: yup.string().required('Bạn chưa nhập tên'),
  address: yup.string().required('Bạn chưa nhập địa chỉ'),
});

export const validationProfileSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
  name: yup.string().required('Bạn chưa nhập tên'),
  email: yup
    .string()
    .email('sai định dạng email')
    .max(255)
    .required('Bạn chưa nhập email'),
});

export const validationPhoneSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
});

const activeMenu = '1-1';

const typeImage = ['image/jpeg', 'image/png', 'image/jpg'];

const ProfileContainer = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const shortPhoneRef = useRef<any>();
  const dispatch = useDispatch();
  const profileData = useSelector((state: RootState) => state.user.profile);
  const isLoadingUpdate = useSelector(
    (state: RootState) => state.user.isLoadings.updateUserProfile,
  );
  const isLoadingUpdateAvatar = useSelector(
    (state: RootState) => state.user.isLoadings.updateUserAvatar,
  );
  const refImage = useRef<HTMLInputElement>(null);
  const [errorDate, setErrorDate] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [addPhone, setAddPhone] = useState(false);
  const [addOtp, setAddOtp] = useState(false);
  const [error, setError] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [key, setKey] = useState('');
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [isLoadingAddPhone, setIsLoadingAddPhone] = useState(false);

  const formikProfile = useFormik({
    initialValues: {
      phone: '',
      name: '',
      date: '',
      month: '',
      year: '',
      gender: 0,
      email: '',
    },
    validationSchema: validationProfileSchema,
    onSubmit: async (values) => {
      if (errorDate) {
        return;
      }
      dispatch(
        upDateUserProfile({
          name: values.name,
          gender: values.gender,
          birthDay: `${
            Number(values.date) >= 10 ? values.date : `0${values.date}`
          }/${Number(values.month) >= 10 ? values.month : `0${values.month}`}/${
            values.year
          }`,
          email: values.email,
        }),
      );
      if (avatar) {
        const file = new FormData();
        file.append('file', avatar);
        dispatch(upDateUserAvatar(file));
      }
    },
  });

  const formikAddPhone = useFormik({
    initialValues: {
      phone: '',
      shortPhone: '+84',
    },
    validationSchema: validationPhoneSchema,
    onSubmit: async () => {
      setIsPinCodeValid(true);
      const number = parsePhoneNumber(formikAddPhone.values.phone);
      const data = await requestAddPhoneNumber({
        phone: formikAddPhone.values.phone,
        regionCode: number?.country ?? 'VN',
      });
      if (data.data.status) {
        console.log(data.data.data);
        setAddPhone(false);
        setAddOtp(true);
        setError('');
        setKey(data.data.data);
      } else {
        setError(data.data.message);
      }
    },
  });

  useEffect(() => {
    if (profileData) {
      formikProfile.setFieldValue('name', profileData.name);
      formikProfile.setFieldValue('phone', profileData.phone);
      formikProfile.setFieldValue('gender', profileData.gender);
      formikProfile.setFieldValue('email', profileData.email);
      formikProfile.setFieldValue(
        'date',
        Number(profileData.birthDay?.substring(0, 2)),
      );
      formikProfile.setFieldValue(
        'month',
        Number(profileData.birthDay?.substring(3, 5)),
      );
      formikProfile.setFieldValue(
        'year',
        Number(profileData.birthDay?.substring(6, 10)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const handleEditProfile = () => {
    if (profileData) {
      formikProfile.setFieldValue('name', profileData.name);
      formikProfile.setFieldValue('gender', profileData.gender);
      formikProfile.setFieldValue('email', profileData.email);
      formikProfile.setFieldValue(
        'date',
        Number(profileData.birthDay?.substring(0, 2)),
      );
      formikProfile.setFieldValue(
        'month',
        Number(profileData.birthDay?.substring(3, 5)),
      );
      formikProfile.setFieldValue(
        'year',
        Number(profileData.birthDay?.substring(6, 10)),
      );
    }
    setAvatar(null);
    setErrorAvatar(false);
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      typeImage.includes(e.target.files[0]?.type) &&
      e.target.files[0]?.size < 1000000
    ) {
      setAvatar(e.target?.files[0]);
      setErrorAvatar(false);
    } else {
      setErrorAvatar(true);
    }
  };

  const handleClickChangeAvatar = () => {
    refImage.current && refImage.current.click();
  };

  const handleChangeDate = (e: React.ChangeEvent<any>) => {
    formikProfile.handleChange(e);
    if (
      !isValidDate(
        e.target.value,
        formikProfile.values.month,
        formikProfile.values.year,
      )
    ) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
    }
  };
  const handleChangeMonth = (e: React.ChangeEvent<any>) => {
    formikProfile.handleChange(e);
    if (
      !isValidDate(
        formikProfile.values.date,
        e.target.value,
        formikProfile.values.year,
      )
    ) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
    }
  };
  const handleChangeYear = (e: React.ChangeEvent<any>) => {
    formikProfile.handleChange(e);
    if (
      !isValidDate(
        formikProfile.values.date,
        formikProfile.values.month,
        e.target.value,
      )
    ) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
    }
  };

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    setIsPinCodeValid(true);
    setError('');
  };

  const requestOTp = async () => {
    const number = parsePhoneNumber(formikAddPhone.values.phone);
    const data = await requestAddPhoneNumber({
      phone: formikAddPhone.values.phone,
      regionCode: number?.country ?? 'VN',
    });
    if (data.data.status) {
      setAddPhone(false);
      setAddOtp(true);
      setError('');
      setKey(data.data.data);
    } else {
      setError(data.data.message);
    }
  };

  const checkPinCode = async () => {
    setError('');
    setIsLoadingAddPhone(true);
    const number = parsePhoneNumber(formikAddPhone.values.phone);
    const data = await submitAddPhoneNumber({
      key,
      phone: formikAddPhone.values.phone,
      otp: pinCode,
      regionCode: number?.country || '',
    });
    setIsLoadingAddPhone(false);
    if (data.data.status) {
      dispatch(getUserProfile());
      setIsPinCodeValid(true);
      setAddOtp(false);
      toast.success(t.addPhoneSuccess);
    } else {
      setError(data.data.message);
      setIsPinCodeValid(false);
    }
  };
  const onChangeShortPhoneInput = (e: any) => {
    formikAddPhone.setFieldValue('shortPhone', e);
    setError('');
  };

  const onChangePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formikAddPhone.setFieldValue(
      'phone',
      `${formikAddPhone.values.shortPhone}${value}`,
    );
    setError('');
  };

  useEffect(() => {
    if (shortPhoneRef.current) {
      shortPhoneRef.current.disabled = true;
    }
  }, [addPhone]);

  const responseFacebook = async (response: ReactFacebookLoginInfo) => {
    if (!response.accessToken) {
      return;
    }
    setError('');
    setIsLoadingAddPhone(true);
    try {
      if (profileData?.facebookKey) {
        const data = await removeSSo({
          type: 1,
        });
        if (data.data.status) {
          toast.success(t.cancelConnectSsoSuccess);
          dispatch({
            type: UPDATE_USER_PROFILE.success,
            payload: {
              ...profileData,
              googleKey: data.data.data.googleKey,
              facebookKey: data.data.data.facebookKey,
            },
          });
        } else {
          toast.error(data.data.message);
        }
      } else {
        const data = await connectSSo({
          access_token: response.accessToken,
          type: 1,
        });
        if (data.data.status) {
          toast.success(t.connectSsoSuccess);
          dispatch({
            type: UPDATE_USER_PROFILE.success,
            payload: {
              ...profileData,
              googleKey: data.data.data.googleKey,
              facebookKey: data.data.data.facebookKey,
            },
          });
        } else {
          toast.error(data.data.message);
        }
      }

      setIsLoadingAddPhone(false);
    } catch (error) {
      console.log(error);
      setIsLoadingAddPhone(false);
    }
  };

  const responseGoogle = async (response: any) => {
    if (response.accessToken) {
      setError('');
      setIsLoadingAddPhone(true);
      try {
        if (profileData?.googleKey) {
          const data = await removeSSo({
            type: 2,
          });
          if (data.data.status) {
            toast.success(t.cancelConnectSsoSuccess);
            dispatch({
              type: UPDATE_USER_PROFILE.success,
              payload: {
                ...profileData,
                googleKey: data.data.data.googleKey,
                facebookKey: data.data.data.facebookKey,
              },
            });
          } else {
            toast.error(data.data.message);
          }
        } else {
          const data = await connectSSo({
            access_token: response.accessToken,
            type: 2,
          });
          if (data.data.status) {
            toast.success(t.connectSsoSuccess);
            dispatch({
              type: UPDATE_USER_PROFILE.success,
              payload: {
                ...profileData,
                googleKey: data.data.data.googleKey,
                facebookKey: data.data.data.facebookKey,
              },
            });
          } else {
            toast.error(data.data.message);
          }
        }

        setIsLoadingAddPhone(false);
      } catch (error) {
        console.log(error);
        setIsLoadingAddPhone(false);
      }
    }
  };

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />
        <div className="right-side">
          {addPhone && (
            <FormPopup
              button={t.confirm}
              onCancel={() => {
                setAddPhone(false);
              }}
              onConfirm={() => formikAddPhone.handleSubmit()}
              title={t.addPhoneNumber}
              showButton
              width={600}
              zIndex={90}
              isLoading={isLoadingAddPhone}
            >
              <div>
                <div className="relative">
                  <div
                    className={`input-phone ${
                      formikAddPhone.touched.phone &&
                      Boolean(formikAddPhone.errors.phone)
                        ? 'error-input'
                        : ''
                    }`}
                  >
                    <PhoneInput
                      defaultCountry="VN"
                      value={formikAddPhone.values.shortPhone}
                      onChange={onChangeShortPhoneInput}
                      international
                      name="shortPhone"
                      ref={shortPhoneRef}
                    />
                    <input
                      name="phone"
                      placeholder={t.inputPhoneNumber}
                      className="input-short"
                      onChange={onChangePhoneInput}
                    />
                  </div>
                  {formikAddPhone.touched.phone &&
                    Boolean(formikAddPhone.errors.phone) && (
                      <div className="text-red mt-2 font-size13">
                        {formikAddPhone.values.phone === ''
                          ? t.forgotInputPhone
                          : t.phoneIncorectFormat}
                      </div>
                    )}
                </div>
              </div>
              {error && (
                <div className="text-red mt-2 font-size13">{error}</div>
              )}
            </FormPopup>
          )}
          {addOtp && (
            <FormPopup
              button={t.confirm}
              onCancel={() => {
                setAddOtp(false);
              }}
              onConfirm={() => null}
              title={t.addPhoneNumber}
              showButton={false}
              width={600}
              zIndex={90}
            >
              <OTPForm
                phone={formikAddPhone.values.phone}
                isEmail={false}
                isPinCodeValid={isPinCodeValid}
                pinCode={pinCode}
                handlePinChange={handlePinChange}
                checkPinCode={checkPinCode}
                requestNewCode={requestOTp}
                isLoading={isLoadingAddPhone}
                error={error}
              />
            </FormPopup>
          )}

          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            ref={refImage}
            style={{ display: 'none' }}
            onChange={handleChangeAvatar}
          />

          <div className="font-bold text-uppercase title headline-01">
            {t.profile}
          </div>
          <StyledBox>
            <div className="d-flex align-items-center mb-4">
              <div
                className="avatar cursor-pointer"
                onClick={handleClickChangeAvatar}
              >
                <img
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : profileData?.avatar
                      ? profileData?.avatar
                      : '/svg/avatar.svg'
                  }
                  alt="name"
                />
                <div className="icon-camera">
                  <Icon name="camera" />
                </div>
              </div>

              <div className="ml-3">
                <div className="text-uppercase mobile-heading-03">
                  {t.avatar}
                </div>
                <div className="cursor-pointer">
                  <span
                    className={`font-size12 text-gray3 ${
                      errorAvatar ? 'text-red' : ''
                    }`}
                  >
                    {t.maxsize}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-column-mobile">
              <div className="w-50-responsive mr-4 flex-shrink-0">
                <div className="headline-03 mb-2">{t.fullName} </div>
                <div className="relative">
                  <InputCustom
                    type="text"
                    placeholder={t.fullName}
                    onChange={formikProfile.handleChange}
                    name="name"
                    value={formikProfile.values.name}
                    error={
                      formikProfile.touched.name &&
                      Boolean(formikProfile.errors.name)
                    }
                    maxLength={50}
                    message={
                      formikProfile.touched.name && formikProfile.errors.name
                    }
                  />
                </div>
              </div>
              <div className="w-50-responsive flex-shrink-0">
                <div className="headline-03 mb-2">{t.phoneNumber}</div>
                <div className="relative">
                  <InputCustom
                    type="text"
                    placeholder={t.inputPhoneNumber}
                    onChange={formikProfile.handleChange}
                    name="phone"
                    value={formikProfile.values.phone}
                    disabled
                  />
                </div>
                {/* {!formikProfile.values.phone && (
                  <div className="w-50-responsive">
                    <button
                      type="button"
                      className="py-3 button button-primary px-4"
                      onClick={() => setAddPhone(true)}
                    >
                      {t.addPhoneNumber}
                    </button>
                  </div>
                )} */}
              </div>
            </div>
            <div className="flex-column-mobile mt-4">
              <div className="w-50-responsive mr-4 flex-shrink-0">
                <div className="headline-03 mb-2">{t.dateOfBirth}</div>
                <div className="d-flex align-items-center">
                  <div className="mr-3 w-33">
                    <select
                      className="select w-100 select-input"
                      name="date"
                      onChange={handleChangeDate}
                      value={formikProfile.values.date}
                    >
                      <option value="">{t.day}</option>
                      {renderDate(1, 31)}
                    </select>
                  </div>
                  <div className="mr-3 w-33">
                    <select
                      className="select w-100 select-input"
                      name="month"
                      onChange={handleChangeMonth}
                      value={formikProfile.values.month}
                    >
                      <option value="">{t.month}</option>
                      {renderDate(1, 12)}
                    </select>
                  </div>

                  <div className="w-33">
                    <select
                      className="select w-100 select-input"
                      name="year"
                      onChange={handleChangeYear}
                      value={formikProfile.values.year}
                    >
                      <option value="">{t.year}</option>
                      {renderDate(1920, 2010)}
                    </select>
                  </div>
                </div>
                {errorDate && (
                  <div className="text-red font-size13">{t.errorDate}</div>
                )}
              </div>

              <div className="w-50-responsive flex-shrink-0">
                <div className="headline-03 mb-2">{t.gender}</div>

                <select
                  className="select w-100 select-input"
                  name="year"
                  onChange={handleChangeYear}
                  value={formikProfile.values.year}
                >
                  <option value="">{t.year}</option>
                  <option value={1}>{t.male}</option>
                  <option value={2}>{t.female}</option>
                  <option value={0}>{t.orther}</option>
                </select>

                {/* <div className="d-flex align-items-center mr-4">
                    <input
                      type="radio"
                      name="gender"
                      onChange={formikProfile.handleChange}
                      value={1}
                      checked={Number(formikProfile.values.gender) === 1}
                    />
                    <span className="ml-2">{t.male}</span>
                  </div>
                  <div className="d-flex align-items-center mr-4">
                    <input
                      type="radio"
                      name="gender"
                      onChange={formikProfile.handleChange}
                      value={2}
                      checked={Number(formikProfile.values.gender) === 2}
                    />
                    <span className="ml-2">{t.female}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="gender"
                      onChange={formikProfile.handleChange}
                      value={0}
                      checked={Number(formikProfile.values.gender) === 0}
                    />
                    <span className="ml-2">{t.orther}</span>
                  </div> */}
              </div>
            </div>
            <div className="flex-column-mobile mt-4 mb-4">
              <div className="w-50-responsive mr-4 flex-shrink-0">
                <div className="headline-03 mb-2">Email</div>
                <div className="relative">
                  <InputCustom
                    type="email"
                    placeholder="Email"
                    onChange={formikProfile.handleChange}
                    name="email"
                    value={formikProfile.values.email}
                    message={
                      formikProfile.touched.email && formikProfile.errors.email
                    }
                    error={
                      formikProfile.touched.email &&
                      Boolean(formikProfile.errors.email)
                    }
                  />
                </div>
              </div>
              <div className="w-50-responsive">
                <div className="headline-03 mb-2">{t.connectSocial}</div>
                <div className="flex-column-mobile mt-4">
                  <div className="mr-2 flex-shrink-0">
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_ID ?? ''}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          type="button"
                          className="button button-outline d-flex align-items-center py-3 px-2 justify-content-center button-200-responsive"
                          disabled={isLoadingAddPhone}
                        >
                          <img src="/svg/google.svg" alt="payment" />
                          <div className="ml-2">Google</div>
                          <div className="text-blue ml-2">
                            {profileData?.googleKey
                              ? t.cancelConnectSocialShort
                              : t.connectSocialShort}
                          </div>
                        </button>
                      )}
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy="single_host_origin"
                    />
                  </div>
                  <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_ID ?? ''}
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <button
                        disabled={isLoadingAddPhone}
                        onClick={renderProps.onClick}
                        type="button"
                        className="button button-outline d-flex align-items-center py-3 px-2 justify-content-center"
                        style={{ width: '240px' }}
                      >
                        <img src="/svg/facebook.svg" alt="payment" />
                        <div className="ml-2">Facebook</div>
                        <div className="text-blue ml-2">
                          {profileData?.facebookKey
                            ? t.cancelConnectSocialShort
                            : t.connectSocialShort}
                        </div>
                      </button>
                    )}
                    // scope="pages_show_list,pages_messaging,pages_manage_metadata,pages_read_engagement"
                    version="3.3"
                    cookie
                    xfbml
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center mt-5">
              <button
                type="button"
                onClick={handleEditProfile}
                className="size-l button button-outline"
                style={{ width: '130px' }}
              >
                {t.cancelChange}
              </button>
              <div className="mlt-5">
                <button
                  className="size-l button button-primary"
                  type="button"
                  onClick={() => formikProfile.handleSubmit()}
                  style={{ width: '130px' }}
                  disabled={isLoadingUpdate || isLoadingUpdateAvatar}
                >
                  {t.saveChange}
                </button>
              </div>
            </div>
          </StyledBox>
        </div>
      </StyledWrap>
    </div>
  );
};

export default ProfileContainer;
