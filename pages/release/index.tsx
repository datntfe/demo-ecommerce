import React, { useState } from 'react';
import { Button, Input } from 'antd';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import toast from 'react-hot-toast';
import Layout from 'components/layout/layout';
import LogoBackgroundAnimate from 'containers/LogoBackgroundAnimate';

const renderer = (data: CountdownRenderProps): React.ReactElement => {
  const { days, hours, minutes, seconds } = data;

  const newDays = days.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const newHours = hours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const newMinutes = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const newSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return (
    <div className="Release-countdown">
      <div className="Release-countdown-item">
        <div className="Release-countdown-item-value">{newDays}</div>
        <div className="Release-countdown-item-label">ngày</div>
      </div>
      <div className="Release-countdown-item">
        <div className="Release-countdown-item-value">{newHours}</div>
        <div className="Release-countdown-item-label">giờ</div>
      </div>
      <div className="Release-countdown-item">
        <div className="Release-countdown-item-value">{newMinutes}</div>
        <div className="Release-countdown-item-label">phút</div>
      </div>
      <div className="Release-countdown-item">
        <div className="Release-countdown-item-value">{newSeconds}</div>
        <div className="Release-countdown-item-label">giây</div>
      </div>
    </div>
  );
};
const milestone = 1672567200000;

const Release: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      toast.error('vui lòng nhập email');
    } else {
      toast.success('Cám ơn bạn đã đăng ký');
    }
  };

  return (
    <Layout hideHeader>
      <div className="Release">
        <LogoBackgroundAnimate animate={false} />
        <div className="Release-wrapper">
          <div className="Release-logo">
            <img src="/logo-with-icon.svg" alt="" />
          </div>
          <h1 className="Release-title">
            SÀN THƯƠNG MẠI ĐIỆN TỬ THẾ HỆ MỚI SẮP RA MẮT
          </h1>
          <h2 className="Release-subtitle">SĂN CỰC PHẨM - GIÁ CỰC SỐC</h2>

          <Countdown date={milestone} renderer={renderer} />

          <div className="Release-register">
            <Input
              type="email"
              placeholder="Nhập email đăng ký nhận thông tin"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubmit}>
              <img src="/svg/sending.svg" alt="" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Release;
