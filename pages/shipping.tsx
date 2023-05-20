import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import ShippingContainer from 'containers/shipping';

const Login: NextPage = () => (
  <Layout>
    <ShippingContainer />
  </Layout>
);

export default Login;
