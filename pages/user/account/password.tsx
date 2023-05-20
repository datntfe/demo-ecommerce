import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import PasswordContainer from 'containers/user/account/PasswordContainer';

const Password: NextPage<any> = (props) => (
  <Layout>
    <PasswordContainer />
  </Layout>
);

export default Password;
