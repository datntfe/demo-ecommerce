import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import CheckoutContainer from 'containers/checkout';

const Checkout: NextPage = () => (
  <Layout>
    <CheckoutContainer />
  </Layout>
);

export default Checkout;
