import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import LoginContainer from 'containers/login';

const Login: NextPage = () => (
  <Layout isLogout>
    <LoginContainer />
  </Layout>
);

export default Login;
