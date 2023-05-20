import FormPopup from 'components/common/FormPopup';
import Icon from 'components/common/Icon';
import LayoutWrapLogin from 'components/layout/wrapLogin';
import ConfirmPassword from 'containers/forgot/components/ConfirmPassword';
import { useFormik } from 'formik';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { storePrevPath } from 'redux/action/authth';
import { loadDataLogin, setStateLoginPopup } from 'redux/action/user';
import { RootState } from 'redux/reducer';
import {
  confirmPinCodeCodeByPhone,
  confirmPinOTPByPhone,
  signupByPhone,
  registerSocialServices,
  registerSocialGetOtpServices,
  registerSocialConfirmOtpServices,
  loginBySocialServices,
  registerSocialActiveServices,
} from 'services/authencation';
import { loginWithUserPass } from 'services/user';
import * as yup from 'yup';
import 'yup-phone';
import OTPForm from './components/OTPForm';
import Success from './components/Success';

const validationSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
});
export const validationPhoneSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
});

const RegisterContainer: React.FC = () => {
  const prePath = useSelector((state: RootState) => state.rootPage.prevPath);
  const shortPhoneRef = useRef<any>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [addPhone, setAddPhone] = useState(false);
  const [addOtp, setAddOtp] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [accessToken, seAccessToken] = useState('');
  const [typeLogin, setTypeLogin] = useState(0);
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [affCode, setAffCode] = useState('');

  const loginSuccess = (token: string, refresh_token: string) => {
    dispatch(loadDataLogin({ token, refreshToken: refresh_token }));
    if (prePath) {
      router.replace(prePath);
      dispatch(storePrevPath(''));
    } else {
      router.replace(affCode ? '/user/affiliate' : '/');
    }
  };
  useEffect(() => {
    const affCode = localStorage.getItem('shopdi-connect');
    if (affCode) {
      setAffCode(affCode);
    }
  }, []);

  const formikAddPhone = useFormik({
    initialValues: {
      phone: '',
      shortPhone: '+84',
    },
    validationSchema: validationPhoneSchema,
    onSubmit: async () => {
      setIsLoading(true);
      setIsPinCodeValid(true);
      setPinCode('');
      setError('');
      const number = parsePhoneNumber(formikAddPhone.values.phone);
      const data = await registerSocialGetOtpServices({
        phone: formikAddPhone.values.phone,
        regionCode: number?.country ?? 'VN',
        access_token: accessToken,
        type: typeLogin,
      });
      if (data.data.status) {
        setAddPhone(false);
        setAddOtp(true);
      } else {
        setError(data.data.message);
      }
      setIsLoading(false);
    },
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      phone: '',
      shortPhone: '+84',
    },
    onSubmit: async (values) => {
      setTypeLogin(0);
      const number = parsePhoneNumber(values.phone);
      setError('');
      setIsLoading(true);
      const data = await signupByPhone({
        phone: values.phone,
        regionCode: number?.country ?? 'VN',
      });
      setIsLoading(false);
      if (data.data.status) {
        setStep(2);
      } else {
        setError(data.data.message);
      }
    },
  });

  const checkPinCode = async () => {
    setError('');
    setIsLoading(true);
    const number = parsePhoneNumber(formik.values.phone);
    const data = await confirmPinOTPByPhone({
      phone: formik.values.phone,
      code: pinCode,
      regionCode: number?.country || '',
    });

    setIsLoading(false);
    if (data.data.status) {
      setStep(3);
      setIsPinCodeValid(true);
    } else {
      setError(data.data.message);
      setIsPinCodeValid(false);
    }
  };

  const checkPinCodeSocial = async () => {
    try {
      setError('');
      setIsLoading(true);
      const number = parsePhoneNumber(formikAddPhone.values.phone);
      const data = await registerSocialConfirmOtpServices({
        phone: formikAddPhone.values.phone,
        regionCode: number?.country ?? 'VN',
        access_token: accessToken,
        type: typeLogin,
        code: pinCode,
      });
      setIsLoading(false);
      if (data.data.status) {
        setStep(3);
        setAddOtp(false);
      } else {
        setError(data.data.message);
        setIsPinCodeValid(false);
      }
    } catch (error) {
      setError(t.hasError);
      setIsLoading(false);
    }
  };

  const requestOTpSocial = async () => {
    try {
      setError('');
      const number = parsePhoneNumber(formikAddPhone.values.phone);
      const data = await registerSocialGetOtpServices({
        phone: formikAddPhone.values.phone,
        regionCode: number?.country ?? 'VN',
        access_token: accessToken,
        type: typeLogin,
      });
      if (data.data.status) {
        setAddPhone(false);
        setAddOtp(true);
      } else {
        setError(data.data.message);
      }
    } catch (error) {
      setError(t.hasError);
    }
  };

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    setIsPinCodeValid(true);
    setError('');
  };
  const requestOTp = async () => {
    const number = parsePhoneNumber(formik.values.phone);

    const data = await signupByPhone({
      phone: formik.values.phone,
      regionCode: number?.country ?? 'VN',
    });

    if (!data.data.status) {
      setError(data.data.message);
    }
  };

  const onCreatePinCode = async (code: string) => {
    setError('');
    setIsLoading(true);

    if (typeLogin === 0) {
      const number = parsePhoneNumber(formik.values.phone);
      const data = await confirmPinCodeCodeByPhone({
        phone: formik.values.phone,
        password: code,
        regionCode: number?.country ?? 'VN',
        presenterCode: affCode,
      });

      setIsLoading(false);
      if (data.data.status) {
        setStep(4);
        setToken(data.data.data.token);
        setRefreshToken(data.data.data.refresh_token);
      } else {
        setError(data.data.message);
      }
    } else {
      const number = parsePhoneNumber(formikAddPhone.values.phone);
      const data = await registerSocialActiveServices({
        access_token: accessToken,
        type: typeLogin,
        phone: formikAddPhone.values.phone,
        regionCode: number?.country ?? 'VN',
        code: pinCode,
        password: code,
        presenterCode: affCode,
      });

      setIsLoading(false);
      if (data.data.status) {
        setStep(4);
        setToken(data.data.data.token);
        setRefreshToken(data.data.data.refresh_token);
      } else {
        setError(data.data.message);
      }
    }
  };

  const onChangeShortPhoneInput = (e: any) => {
    if (!addPhone) {
      formik.setFieldValue('shortPhone', e);
    } else {
      formikAddPhone.setFieldValue('shortPhone', e);
    }
  };
  const onChangePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setError('');
    if (!addPhone) {
      formik.setFieldValue('phone', `${formik.values.shortPhone}${value}`);
    } else {
      formikAddPhone.setFieldValue(
        'phone',
        `${formik.values.shortPhone}${value}`,
      );
    }
  };
  const onBack = async () => {
    loginSuccess(token, refreshToken);
    dispatch(setStateLoginPopup(false));
  };

  const responseFacebook = async (response: ReactFacebookLoginInfo) => {
    if (!response.accessToken) {
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const data = await registerSocialServices({
        access_token: response.accessToken,
        type: 1,
      });
      seAccessToken(response.accessToken);
      setTypeLogin(1);
      if (data.data.status) {
        setAddPhone(true);
      } else {
        setError(data.data.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const responseGoogle = async (response: any) => {
    if (response.accessToken) {
      setError('');
      setIsLoading(true);
      try {
        const data = await registerSocialServices({
          access_token: response.accessToken,
          type: 2,
        });
        seAccessToken(response.accessToken);
        setTypeLogin(2);
        if (data.data.status) {
          setAddPhone(true);
        } else {
          setError(data.data.message);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (shortPhoneRef.current) {
      shortPhoneRef.current.disabled = true;
    }
  }, []);

  const loginExitAccount = async () => {
    setError('');
    setIsLoading(true);
    try {
      const data = await loginBySocialServices({
        access_token: accessToken,
        type: typeLogin,
      });
      if (data.data.status) {
        loginSuccess(data.data.data.token, data.data.data.refresh_token);
      } else {
        setError(data.data.message);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <LayoutWrapLogin>
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
          isLoading={isLoading}
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
          {error && <div className="text-red mt-2 font-size13">{error}</div>}
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
            checkPinCode={checkPinCodeSocial}
            requestNewCode={requestOTpSocial}
            isLoading={isLoading}
            error={error}
          />
        </FormPopup>
      )}

      <div className="title heading-2">
        {step === 3
          ? t.createPassword
          : step === 1
          ? t.register
          : step === 4
          ? ''
          : t.confirmCode}
      </div>
      <div className="login-wrap">
        {step === 1 && (
          <div>
            <div className="">
              <div
                className={`input-phone ${
                  formik.touched.phone && Boolean(formik.errors.phone)
                    ? 'error-input'
                    : ''
                }`}
              >
                <PhoneInput
                  defaultCountry="VN"
                  value={formik.values.shortPhone}
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
              {formik.touched.phone && Boolean(formik.errors.phone) && (
                <div className="text-red mt-2 font-size13">
                  {formik.values.phone === ''
                    ? t.forgotInputPhone
                    : t.phoneIncorectFormat}
                </div>
              )}
            </div>

            {error && (
              <div className="text-red mt-2 font-size13 text-center">
                {error}
              </div>
            )}

            {error ===
              'Tài khoản này đã liên kết với một tài khoản Shopdi. Bạn có muốn đăng nhập vào tài khoản này?' && (
              <button
                type="button"
                className="button-login"
                onClick={loginExitAccount}
                disabled={isLoading}
              >
                {isLoading ? t.inprogress : t.login}
              </button>
            )}

            <button
              type="button"
              className="button-login"
              onClick={() => formik.handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? t.inprogress : t.register}
            </button>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <span className="text-gray2 mt-1">
                {t.byAgree}
                <Link href="/dieu-khoan-dich-vu/">
                  <a className="text-blue">
                    {' '}
                    <u>{t.tearms} </u>
                  </a>
                </Link>
              </span>
            </div>
            <div className="d-flex mt-5 mb-3 justify-content-center">
              <div className="text-or">{t.anotherLogin}</div>
            </div>
            <div className="d-flex justify-content-center">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID ?? ''}
                render={(renderProps) => (
                  <button
                    className="button-social google"
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={isLoading}
                  >
                    <Icon name="google-icon" />
                    &nbsp; Google
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />

              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_ID ?? ''}
                callback={responseFacebook}
                render={(renderProps) => (
                  <button
                    className="button-social google"
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={isLoading}
                  >
                    <Icon name="facebook-icon" />
                    &nbsp; Facebook
                  </button>
                )}
                // scope="pages_show_list,pages_messaging,pages_manage_metadata,pages_read_engagement"
                version="3.3"
                cookie
                xfbml
              />
            </div>
            <div className="mt-5 text-center">
              <span className="text-gray2">{t.haveAccount}</span>&nbsp;
              <Link href="/login">
                <a className="text-blue">
                  <span>{t.login}</span>
                </a>
              </Link>
            </div>
          </div>
        )}
        {step === 2 && (
          <OTPForm
            phone={formik.values.phone}
            isEmail={false}
            isPinCodeValid={isPinCodeValid}
            pinCode={pinCode}
            handlePinChange={handlePinChange}
            checkPinCode={checkPinCode}
            requestNewCode={requestOTp}
            isLoading={isLoading}
            error={error}
          />
        )}
        {step === 3 && (
          <ConfirmPassword
            onSubmit={onCreatePinCode}
            type="register"
            isLoading={isLoading}
            error={error}
          />
        )}
        {step === 4 && <Success isRegister onBack={onBack} />}
      </div>
    </LayoutWrapLogin>
  );
};

export default RegisterContainer;
