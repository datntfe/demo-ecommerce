import Layout from 'components/layout/layout';
import React from 'react';

const Custom500 = () => (
  <Layout>
    <div
      className="d-flex justify-content-center align-items-center flex-column h-screen mx-5 my-5 overflow-hidden"
      style={{ height: '500px' }}
    >
      <div
        style={{ fontSize: '128px', lineHeight: '1em' }}
        className="font-bold mb-5"
      >
        500
      </div>
      <div
        style={{ fontSize: '28px', lineHeight: '1em' }}
        className="font-bold"
      >
        Trang bạn tìm kiếm không tồn tại
      </div>
      <div className="text-center mt-3">
        Chúng tôi rất tiếc, đã có lổi xảy ra.
        <br />
        Bạn có thể trở lại trang shopdi.io hoặc liên hệ để hotline:{' '}
        <span className="text-blue">19003395</span> được trợ giúp
      </div>
    </div>
  </Layout>
);

export default Custom500;
