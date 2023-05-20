import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import RegisterContainer from 'containers/register';

const Register: NextPage = () => (
  <Layout isLogout>
    <RegisterContainer />
  </Layout>
);

export default Register;
