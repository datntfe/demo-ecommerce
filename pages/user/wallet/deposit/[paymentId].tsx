import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import PaymentDetailContainer from 'containers/user/wallet/paymentDetail';

const PaymentId: NextPage<any> = (props) => (
  <Layout>
    <PaymentDetailContainer />
  </Layout>
);

export default PaymentId;
