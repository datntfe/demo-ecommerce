import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import ForgotPinContainer from 'containers/forgotPin';

const Forgot: NextPage = () => (
  <Layout isLogout>
    <ForgotPinContainer />
  </Layout>
);

export default Forgot;
