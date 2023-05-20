import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import MyOrderContainer from 'containers/myOrder';

const Checkout: NextPage = () => (
  <Layout>
    <MyOrderContainer />
  </Layout>
);

export default Checkout;
