import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import ForgotContainer from 'containers/forgot';

const Forgot: NextPage = () => (
  <Layout isLogout>
    <ForgotContainer />
  </Layout>
);

export default Forgot;
