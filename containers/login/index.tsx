import Icon from 'components/common/Icon';
import InputCustom from 'components/common/Input';
import LayoutWrapLogin from 'components/layout/wrapLogin';
import { useFormik } from 'formik';
import { IAuthReponseSignIn } from 'interfaces/response/auth/user';
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
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { SetAuthSuccessfull, storePrevPath } from 'redux/action/authth';
import { loadDataLogin, setStateLoginPopup } from 'redux/action/user';
import { RootState } from 'redux/reducer';
import { loginWithUserPass } from 'services/user';
import {
  loginBySocialServices,
  registerSocialGetOtpServices,
  registerSocialConfirmOtpServices,
  registerSocialActiveServices,
} from 'services/authencation';
import useKeyPress from 'utils/keypress';
import * as yup from 'yup';
import 'yup-phone';
import FormPopup from 'components/common/FormPopup';
import OTPForm from 'containers/register/components/OTPForm';
import ConfirmPassword from 'containers/forgot/components/ConfirmPassword';
import Success from 'containers/register/components/Success';

const validationSchema = yup.object({
  phone: yup.string().phone('VN').required('Số điện thoại chưa đúng định dạng'),
  password: yup.string().required('Bạn quên nhập mật khẩu'),
});

export const validationPhoneSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
});

const LoginContainer: React.FC<PropsFromRedux> = ({ prePath }) => {
  const shortPhoneRef = useRef<any>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const onEnter = useKeyPress('Enter');
  const [addPhone, setAddPhone] = useState(false);
  const [addOtp, setAddOtp] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [accessToken, seAccessToken] = useState('');
  const [typeLogin, setTypeLogin] = useState(0);
  const [step, setStep] = useState(1);
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const loginSuccess = (token: string, refresh_token: string) => {
    dispatch(loadDataLogin({ token, refreshToken: refresh_token }));
    if (prePath) {
      router.replace(prePath);
      dispatch(storePrevPath(''));
    } else {
      router.replace('/');
    }
  };
  const formikAddPhone = useFormik({
    initialValues: {
      phone: '',
      shortPhone: '+84',
    },
    validationSchema: validationPhoneSchema,
    onSubmit: async () => {
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
    },
  });

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    setIsPinCodeValid(true);
    setError('');
  };
  const requestOTp = async () => {
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
  };

  const checkPinCode = async () => {
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
      setAddOtp(false);
      setStep(2);
    } else {
      setError(data.data.message);
      setIsPinCodeValid(false);
    }
  };

  const formik = useFormik({
    validationSchema,
    initialValues: {
      phone: '',
      password: '',
      shortPhone: '+84',
    },
    onSubmit: async (values) => {
      const number = parsePhoneNumber(values.phone);
      setError('');
      setIsLoading(true);
      const data = await loginWithUserPass({
        username: values.phone,
        regionCode: number?.country ?? 'VN',
        password: values.password,
      });
      setIsLoading(false);
      if (data.data.status) {
        loginSuccess(data.data.data.token, data.data.data.refresh_token);
      } else {
        setError(data.data.message);
      }
    },
  });
  useEffect(() => {
    const request = async () => {
      const number = parsePhoneNumber(formik.values.phone);
      setError('');
      setIsLoading(true);
      const data = await loginWithUserPass({
        username: formik.values.phone,
        regionCode: number?.country ?? 'VN',
        password: formik.values.password,
      });
      setIsLoading(false);
      if (data.data.status) {
        loginSuccess(data.data.data.token, data.data.data.refresh_token);
      } else {
        setError(data.data.message);
      }
    };

    if (onEnter && !isLoading) {
      request();
    }
  }, [onEnter]);

  const onChangeShortPhoneInput = (e: any) => {
    if (!addPhone) {
      formik.setFieldValue('shortPhone', e);
    } else {
      formikAddPhone.setFieldValue('shortPhone', e);
    }
  };
  const onChangePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!addPhone) {
      formik.setFieldValue('phone', `${formik.values.shortPhone}${value}`);
    } else {
      formikAddPhone.setFieldValue(
        'phone',
        `${formik.values.shortPhone}${value}`,
      );
    }
  };

  const responseFacebook = async (response: ReactFacebookLoginInfo) => {
    if (!response.accessToken) {
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const data = await loginBySocialServices({
        access_token: response.accessToken,
        type: 1,
      });
      if (data.data.status) {
        loginSuccess(data.data.data.token, data.data.data.refresh_token);
      } else {
        seAccessToken(response.accessToken);
        setTypeLogin(1);
        switch (data.data.data.type) {
          case 1:
            setAddPhone(true);
            break;
          case 2: {
            loginSuccess(data.data.data.token, data.data.data.refresh_token);
            break;
          }

          case 3:
            setError(data.data.message);
            break;

          default:
            break;
        }
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
        const data = await loginBySocialServices({
          access_token: response.accessToken,
          type: 2,
        });
        if (data.data.status) {
          loginSuccess(data.data.data.token, data.data.data.refresh_token);
        } else {
          seAccessToken(response.accessToken);
          setTypeLogin(2);
          switch (data.data.data.type) {
            case 1:
              setAddPhone(true);
              break;
            case 2: {
              loginSuccess(data.data.data.token, data.data.data.refresh_token);
              break;
            }

            case 3:
              setError(data.data.message);
              break;

            default:
              break;
          }
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
    if (router.query?.next) {
      dispatch(storePrevPath(`/${router.query.next}`));
    }
  }, []);

  const onCreatePinCode = async (code: string) => {
    setError('');
    setIsLoading(true);
    const number = parsePhoneNumber(formikAddPhone.values.phone);
    const data = await registerSocialActiveServices({
      access_token: accessToken,
      type: typeLogin,
      phone: formikAddPhone.values.phone,
      regionCode: number?.country ?? 'VN',
      code: pinCode,
      password: code,
    });
    setIsLoading(false);
    if (data.data.status) {
      setStep(3);
      setToken(data.data.data.token);
      setRefreshToken(data.data.data.refresh_token);
    } else {
      setError(data.data.message);
    }
  };
  const onBack = () => {
    loginSuccess(token, refreshToken);
    dispatch(setStateLoginPopup(false));
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
            checkPinCode={checkPinCode}
            requestNewCode={requestOTp}
            isLoading={isLoading}
            error={error}
          />
        </FormPopup>
      )}

      <div className="title heading-2">{t.login}</div>
      <div className="login-wrap" style={{ minHeight: '400px' }}>
        {step === 1 && (
          <div>
            <div className="mb-3">
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
                  name={t.phoneNumber}
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

            <div className="password-field">
              <InputCustom
                className="w-100 font-size16 input-login"
                type={showPass ? 'text' : 'password'}
                placeholder={t.inputPassword}
                onChange={formik.handleChange}
                name="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                message={formik.touched.password && formik.errors.password}
              />
              <div
                className="icon-view-pass"
                onClick={() => setShowPass(!showPass)}
              >
                <Icon name={showPass ? 'eye' : 'eye-block'} />
              </div>
            </div>
            <div
              className={`d-flex ${
                error ? 'justify-content-between' : 'justify-content-end'
              }`}
            >
              {error && (
                <div className="text-red mt-3 font-size13">{error}</div>
              )}
              <div className="forget-text">
                <Link href="/forgot">
                  <a className="text-blue">
                    <u>{t.forgotPassword}</u>
                  </a>
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="button-login"
              onClick={() => formik.handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? t.inprogress : t.login}
            </button>
            <div className="d-flex mt-5 justify-content-center">
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
              <span className="text-gray2">{t.youDontHaveAccount}</span>&nbsp;
              <Link href="/register">
                <a className="text-blue">
                  <span>{t.register}</span>
                </a>
              </Link>
            </div>
          </div>
        )}
        {step === 2 && (
          <ConfirmPassword
            onSubmit={onCreatePinCode}
            type="register"
            isLoading={isLoading}
            error={error}
          />
        )}
        {step === 3 && <Success isRegister onBack={onBack} />}
      </div>
    </LayoutWrapLogin>
  );
};

// export default LoginContainer;
export interface HomePageProps {
  auth?: IAuthReponseSignIn;
}
const mapStateToProps = (state: RootState, ownProps: HomePageProps) => ({
  ...ownProps,
  prePath: state.rootPage.prevPath,
});
const connector = connect(mapStateToProps, {
  SetAuthSuccessfullAction: SetAuthSuccessfull,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(LoginContainer);
