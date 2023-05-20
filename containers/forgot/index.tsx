/* eslint-disable prettier/prettier */
import LayoutWrapLogin from 'components/layout/wrapLogin';
import OTPForm from 'containers/register/components/OTPForm';
import Success from 'containers/register/components/Success';
import { useFormik } from 'formik';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import { setStateLoginPopup } from 'redux/action/user';
import { confirmForgotPassword, confirmOTPForgotPassword, forgotPassword } from 'services/authencation';
import { loginWithUserPass } from 'services/user';
import * as yup from 'yup';
import 'yup-phone';
import ConfirmPassword from './components/ConfirmPassword';



const validationSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
});



const ForgotContainer: React.FC = () => {
  const shortPhoneRef = useRef<any>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [keyCode, setKeyCode] = useState('');
  

  const formik = useFormik({
    validationSchema,
    initialValues: {
      phone: '',
      shortPhone:'+84'
    },
    onSubmit: async (values) => {
      setError('');
      setIsLoading(true);
      const number = parsePhoneNumber(values.phone);
      const  data = await forgotPassword({ phone: values.phone, regionCode: number?.country  ?? 'VN' });
      setIsLoading(false);
      dispatch(setStateLoginPopup(false))
      if (data.data.status) {
        setStep(2);
      } else {
        setError(data.data.message);
      }

    },
  });


  const renderTitle = () => {
    switch (step) {
      case 1:
        return t.forgotPassword;
      case 2:
        return t.confirmOtp;
      case 3:
        return t.createPassword;
      default:
        return '';
    }
  };
  const onChangeShortPhoneInput = (e: any) => {
    formik.setFieldValue('shortPhone', e);
  };
const onChangePhoneInput = (e:React.ChangeEvent<HTMLInputElement>) => {
  const {value} = e.target;
  formik.setFieldValue('phone', `${formik.values.shortPhone}${value}`);
}


  const checkPinCode = async () => {
    setError('');
    setIsLoading(true);
    const number = parsePhoneNumber(formik.values.phone);
    const data = await confirmOTPForgotPassword({
      phone: formik.values.phone,
      code: pinCode,
      regionCode: number?.country  ?? 'VN',
    });
    setIsLoading(false);
    if (data.data.status) {
      setKeyCode(data.data.data)
      setStep(3);
      setIsPinCodeValid(true);
    } else {
      setError(data.data.message);
      setIsPinCodeValid(false);
    }
  };

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    setIsPinCodeValid(true);
    setError('');
  };
  const requestOTp = async () => {
    const number = parsePhoneNumber(formik.values.phone);
    const data = await forgotPassword({ phone: formik.values.phone, regionCode: number?.country  ?? 'VN' });
    if (!data.data.status) {
      setError(data.data.message);
    }
  };
  const onCreatePinCode = async (code: string) => {
    setNewPassword(code);
    setError('');
    setIsLoading(true);
    const number = parsePhoneNumber(formik.values.phone);
    try {
      const data = await confirmForgotPassword({
        key:keyCode,
        phone: formik.values.phone,
        password:code,
        regionCode: number?.country  ?? 'VN',
      });
      setIsLoading(false);
      if (data.data.status) {
        setStep(4);
      } else {
        setError(data.data.message);
      }
    } catch (error) {
      const err = error as any;
      if (err.response) {
        setError(String(err?.response?.data?.message));
      }
    }

  };

  const onBack = async () => {
    const number = parsePhoneNumber(formik.values.phone);
    const data = await loginWithUserPass({
      username: formik.values.phone,
      regionCode: number?.country ?? 'VN',
      password: newPassword,
    });
    if (data.data.status) {
      router.replace('/login');
    }
  };


  useEffect(() => {
    if (shortPhoneRef.current) {
      shortPhoneRef.current.disabled = true;
    }
  }, []);

  return (
    <LayoutWrapLogin>
      {/* {error === 'Dữ liệu không tồn tại' && (
      <AlertPopup
          button="ĐĂNG KÝ"
          content={(
            <div className="text-center">
              Số điện thoại <span className="font-bold">{formik.values.phone}</span>
              <br />
              <span className="text-red">không tồn tại</span>
            </div>
          )}
          onConfirm={() => {
            router.replace('/register');
          }}
          iconName="alert-icon"
          onCancel={() => setError('')}
        />
      )} */}
      <div className="title heading-2">{renderTitle()}</div>
      <div className="login-wrap">
        {step === 1 && (
          <div>
            <div className='mb-4 text-center text-gray2'>
              {t.hintForgot}
            </div>
        
            <div className={`input-phone ${formik.touched.phone && Boolean(formik.errors.phone) ? 'error-input' : ''}`}>
              <PhoneInput
                defaultCountry="VN"
                value={formik.values.shortPhone}
                onChange={onChangeShortPhoneInput}
                international
                name="shortPhone"
                ref={shortPhoneRef}
              />
              <input name={t.phoneNumber} placeholder={t.inputPhoneNumber} className='input-short' onChange={onChangePhoneInput}/>
            </div>

              {formik.touched.phone && Boolean(formik.errors.phone) && (
              <div className="text-red mt-2 font-size13">
                {formik.values.phone === '' ? t.forgotInputPhone : t.phoneIncorectFormat}
              </div>
          )}
        

            {error && <div className="text-danger mt-2 ml-2 text-center">{error}</div>}
            <button type="button" className="button-login mb-5" onClick={() => formik.handleSubmit()}>
              {isLoading ? t.inprogress : t.confirm}
            </button>

            {/* <div className="mt-5 d-flex align-items-center">
              <span>
                <Icon name="arrow-left" />
              </span>
              <Link href="/login">
                <a>
                  <span className="text-orange">Quay lại trang đăng nhập</span>
                </a>
              </Link>
            </div> */}
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
        {step === 3 && <ConfirmPassword onSubmit={onCreatePinCode} type="password" />}
        {step === 4 && <Success isRegister={false} onBack={onBack}/>}
      </div>
    </LayoutWrapLogin>
  );
};

export default ForgotContainer;
