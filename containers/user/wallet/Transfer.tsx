import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import FormPopup from 'components/common/FormPopup';
import Icon from 'components/common/Icon';
import InputCustom from 'components/common/Input';
import { BannerWallet } from 'components/users/BannerWallet';
import LeftSide from 'components/users/LeftSide';
import OTPForm from 'containers/register/components/OTPForm';
import { useFormik } from 'formik';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'redux/action/user';
import { transfersCoin } from 'redux/action/wallet';
import { RootState } from 'redux/reducer';
import { requestAddPhoneNumber, submitAddPhoneNumber } from 'services/user';
import { getUserByPhoneServices, transferServices } from 'services/wallet';
import styled from 'styled-components';
import { useDebounce } from 'utils/useDebounc';
import * as yup from 'yup';
import 'yup-phone';
import { FAKE_DEPOSIT } from './deposit';

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
const validationSchema = yup.object({
  userId: yup
    .string()
    .phone('VN')
    .required('Số điện thoại chưa đúng định dạng'),
  amount: yup.string().required('Bạn quên nhập số xu'),
});
export const validationPhoneSchema = yup.object({
  phone: yup.string().phone('VN').required('Bạn chưa nhập số điện thoại'),
});

const activeMenu = '6-3';
const Purchase = () => {
  const shortPhoneRef = useRef<any>();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile);
  const [isLoadingTransfer, setIsLoadingTransfer] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [addPhone, setAddPhone] = useState(false);
  const [addOtp, setAddOtp] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [key, setKey] = useState('');
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [isLoadingAddPhone, setIsLoadingAddPhone] = useState(false);
  const [confirmTransfer, setConfirmTransfer] = useState(false);
  const [userIdReceive, setUserIdReceive] = useState('');

  const formik = useFormik({
    validationSchema,
    initialValues: {
      userId: '',
      amount: '',
    },
    onSubmit: () => {
      if (!profile?.phone) {
        setAddPhone(true);
      } else {
        setConfirmTransfer(true);
      }
    },
  });

  const debouncedSearchTerm = useDebounce(formik.values.userId, 300);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        getUserByPhoneServices(formik.values.userId)
          .then((results) => {
            setIsSearching(false);
            setDisplayName(results.data.data.name);
            setUserIdReceive(results.data.data.userId);
          })
          .catch((error) => console.log(error));
      } else {
        setDisplayName('');
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );
  const formikAddPhone = useFormik({
    initialValues: {
      phone: '',
      shortPhone: '+84',
    },
    validationSchema: validationPhoneSchema,
    onSubmit: async () => {
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

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    setIsPinCodeValid(true);
    setError('');
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
  const requestOTp = async () => {
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
  };

  const handleTransfer = async () => {
    setIsLoadingTransfer(true);
    try {
      const result = await transferServices({
        userId: userIdReceive,
        amount: formik.values.amount,
      });
      if (result.data.status) {
        toast.success(t.transferCoinSuccess);
        formik.resetForm();
        dispatch(transfersCoin(Number(formik.values.amount)));
      } else {
        toast.error(result.data.message);
      }
      setIsLoadingTransfer(false);
      setConfirmTransfer(false);
    } catch (error) {
      const err = error as any;
      if (err.response) {
        toast.error(String(err?.response?.data?.message));
      }
      setIsLoadingTransfer(false);
    }
  };

  return (
    <div className="container transfer-page">
      {addPhone && (
        <FormPopup
          button="Xác nhận"
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
                  name={t.phoneNumber}
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
                      : t.wrongFormatPhone}
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
            isLoading={isLoadingAddPhone}
            error={error}
          />
        </FormPopup>
      )}
      {confirmTransfer && (
        <ConfirmPopup
          onCancel={() => setConfirmTransfer(false)}
          onConfirm={handleTransfer}
          title={t.transferCoin}
          isLoading={isLoadingTransfer}
        >
          <div className="text-center font-size20">
            Chuyển <b>{formik.values.amount}</b> {t.coinTo}{' '}
            <b>{formik.values.userId}</b>
          </div>
          <div className="text-center mt-2">{t.canNotRevertCoin}</div>
        </ConfirmPopup>
      )}
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />
        <div className="right-side">
          <div className="headline-01 title mb-3 text-uppercase">
            {t.transferCoin}
          </div>
          <StyledWrapInner>
            <BannerWallet />
            <div className="wrap-transfer-input">
              <div>
                <div className="heading-05 mbt-3">{t.receivedPhoneNumber}:</div>
                <div
                  className={`input-phone mb-5 ${
                    formik.touched.userId && Boolean(formik.errors.userId)
                      ? 'error-input'
                      : ''
                  }`}
                >
                  <input
                    name="userId"
                    placeholder={t.inputPhoneNumber}
                    onChange={formik.handleChange}
                    value={formik.values.userId}
                  />
                  {displayName && (
                    <div className="d-flex align-items-center">
                      <span className="mt-1 text-uppercase font-size15">
                        {displayName}
                      </span>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          formik.setFieldValue('userId', '');
                          setDisplayName('');
                        }}
                      >
                        <Icon name="close-circle" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="heading-05 mbt-3">{t.inputCoin}:</div>
                <div className="input-amount mb-5">
                  <InputCustom
                    name="amount"
                    placeholder={t.inputCoinAmount}
                    type="number"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.amount && Boolean(formik.errors.amount)
                    }
                    value={formik.values.amount}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap mb-4">
              {FAKE_DEPOSIT.map((item) => (
                <StyledDepositItem
                  key={item.id}
                  isActive={String(item.price) === String(formik.values.amount)}
                  onClick={() => formik.setFieldValue('amount', item.price)}
                >
                  {item.price} {t.coin}
                </StyledDepositItem>
              ))}
            </div>

            <div
              className={`d-flex mt-4 align-items-center ${
                error ? 'justify-content-between' : 'justify-content-end'
              }`}
            >
              {error && <div className="text-red">{error}</div>}

              <button
                type="button"
                className="px-5 py-3 button button-primary text-uppercase"
                onClick={() => formik.handleSubmit()}
                disabled={
                  isLoadingTransfer ||
                  !userIdReceive ||
                  (profile?.point ?? 0) < Number(formik.values.amount)
                }
              >
                {t.confirm}
              </button>
            </div>
          </StyledWrapInner>
        </div>
      </StyledWrap>
    </div>
  );
};

export default Purchase;
