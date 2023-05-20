import React from 'react';
import GuestLayout from 'layouts/GuestLayout';
import Link from 'next/link';
import { Paths } from 'routers';

const Custom404 = () => (
  <GuestLayout>
    <div
      className="d-flex justify-content-center align-items-center flex-column h-screen mx-5 my-5 overflow-hidden"
      style={{ height: '500px' }}
    >
      <div
        style={{ fontSize: '7rem', lineHeight: '8rem', fontWeight: 600 }}
        className="mb-4"
      >
        404
      </div>
      <div
        style={{ fontSize: '2.8rem', lineHeight: '3.6rem', fontWeight: 600 }}
        className="mb-2"
      >
        Trang bạn tìm kiếm không tồn tại
      </div>
      <div
        className="text-center mt-3"
        style={{ fontSize: '1.8rem', lineHeight: '2.8rem', fontWeight: 500 }}
      >
        Chúng tôi rất tiếc,địa chỉ truy cập của bạn không tồn tại.
        <br />
        Bạn có thể trở lại <Link href={Paths.Home}>Trang Chủ</Link> hoặc liên hệ
        để hotline:{' '}
        <Link href="tel: 0818442288" passHref>
          <a>0818442288</a>
        </Link>{' '}
        được trợ giúp
      </div>
    </div>
  </GuestLayout>
);

export default Custom404;
