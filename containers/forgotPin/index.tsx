import Icon from 'components/common/Icon';
import LayoutWrapLogin from 'components/layout/wrapLogin';
import OTPForm from 'containers/register/components/OTPForm';
import Link from 'next/link';
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
// import Success from 'containers/register/components/Success';
import InputCustom from 'components/common/Input';
import ConfirmPassword from 'containers/forgot/components/ConfirmPassword';

const ForgotPinContainer: React.FC = () => {
  const [value, setValue] = useState('');
  const [showError, setShowError] = useState('');
  const [step, setStep] = useState(1);
  const onSubmit = () => {
    if (!value) {
      setShowError('vui lòng nhập thông tin!');
    } else {
      setStep(2);
    }
  };

  const renderTitle = () => {
    switch (step) {
      case 1:
        return 'Quên Mã PIN';
      case 2:
        return 'Xác Thực Tài Khoản';
      case 3:
        return 'Tạo Mã PIN Mới';

      default:
        return '';
    }
  };

  return (
    <LayoutWrapLogin>
      <div className="title">{renderTitle()}</div>
      <div className="login-wrap">
        {step === 1 && (
          <div>
            <div>
              Nhập email hoặc số điện thoại
              <br /> bạn dùng để đăng ký tài khoản Shopdi
            </div>

            <InputCustom
              className="email-field"
              type="text"
              placeholder="Email hoặc số điện thoại"
              onChange={(e) => {
                setValue(e.target.value);
                setShowError('');
              }}
            />
            {showError && (
              <div className="text-danger mt-2 ml-2">{showError}</div>
            )}
            <button
              type="button"
              className="button-login mb-5"
              onClick={onSubmit}
            >
              TIẾP TỤC
            </button>

            <div className="mt-5 d-flex align-items-center">
              <span>
                <Icon name="arrow-left" />
              </span>
              <Link href="/login">
                <a>
                  <span className="text-orange">Quay lại trang đăng nhập</span>
                </a>
              </Link>
            </div>
          </div>
        )}
        {step === 2 && (
          <OTPForm
            phone={value}
            checkPinCode={() => null}
            requestNewCode={() => null}
            isEmail={value.includes('@')}
          />
        )}
        {step === 3 && (
          <ConfirmPassword onSubmit={() => setStep(4)} type="pin" />
        )}
        {/* {step === 4 && <Success isRegister={false} />} */}
      </div>
    </LayoutWrapLogin>
  );
};

export default ForgotPinContainer;
