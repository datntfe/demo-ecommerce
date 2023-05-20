import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import Icon from 'components/common/Icon';
import InputCustom from 'components/common/Input';
import LeftSide from 'components/users/LeftSide';
import { useFormik } from 'formik';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { logOut } from 'redux/action/user';
import { changePassword } from 'services/authencation';
import styled from 'styled-components';
import * as yup from 'yup';
import 'yup-phone';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  oldPassword: yup.string().required('Bạn quên nhập mật khẩu cũ'),
  newPassword: yup
    .string()
    .required('Bạn quên nhập mật khẩu mới')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-=+[\];':",.<>`~/])(?=.{8,})/,
      'Mật khẩu it nhất 8 ký tự bao gồm chữ in hoa, in thường , số và ký tự đặc biệt',
    ),
  confirmNewPassword: yup
    .string()
    .required('Bạn quên xác nhận mật khẩu')
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp'),
});

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 25px;
    .title {
      font-size: 20px;
      border-bottom: 1px solid #c2c2c2;
      padding: 10px 0;
    }

    .labelChange {
      font-size: 12px;
      color: #2972fe;
      position: absolute;
      right: 10px;
      top: 12px;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
    }
  }
`;

const activeMenu = '1-3';
const PasswordContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formik = useFormik({
    validationSchema,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async (values) => {
      try {
        setError('');
        setIsLoading(true);
        const data = await changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        setIsLoading(false);
        if (data.data.status) {
          setSuccess(true);
        } else {
          setError(data.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="font-size16 font-bold title">{t.changePassword}</div>

          <div className="mb-4 text-gray3 mt-4">{t.hintChangePass}</div>
          <div>
            {success && (
              <ConfirmPopup
                onConfirm={() => {
                  setSuccess(false);
                  dispatch(logOut());
                }}
                header={false}
              >
                <div className="text-center mb-3">
                  <img src="/svg/alert-success.svg" alt="icon" />
                </div>
                <div className="text-center">{t.changePassSuccess}</div>
              </ConfirmPopup>
            )}
            <div className="w-50-responsive mb-5">
              <div className="mb-2"> {t.oldPassword}</div>
              <div className="relative mb-3">
                <InputCustom
                  type={showPass ? 'text' : 'password'}
                  placeholder={t.inputOldPassword}
                  onChange={formik.handleChange}
                  name="oldPassword"
                  error={
                    formik.touched.oldPassword &&
                    Boolean(formik.errors.oldPassword)
                  }
                  message={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                />
                <div
                  className="labelChange cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  <Icon name={showPass ? 'eye' : 'eye-block'} />
                </div>
              </div>
              <div className="mb-2"> {t.newPassword}</div>
              <div className="relative mb-3">
                <InputCustom
                  type={showPass ? 'text' : 'password'}
                  placeholder={t.inputNewpassWord}
                  onChange={formik.handleChange}
                  name="newPassword"
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  message={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />
              </div>
              <div className="mb-2">{t.reInputNewpassWord}</div>
              <div className="relative">
                <InputCustom
                  type={showPass ? 'text' : 'password'}
                  placeholder={t.password}
                  onChange={formik.handleChange}
                  name="confirmNewPassword"
                  error={
                    formik.touched.confirmNewPassword &&
                    Boolean(formik.errors.confirmNewPassword)
                  }
                  message={
                    formik.touched.confirmNewPassword &&
                    formik.errors.confirmNewPassword
                  }
                />
              </div>
            </div>
            {error && (
              <div className="text-red mt-2 font-size13 mb-2">{error}</div>
            )}
            <button
              type="button"
              onClick={() => formik.handleSubmit()}
              disabled={isLoading}
              className="button button-primary size-l w-300"
            >
              {t.confirm}
            </button>
          </div>
        </div>
      </StyledWrap>
    </div>
  );
};

export default PasswordContainer;
