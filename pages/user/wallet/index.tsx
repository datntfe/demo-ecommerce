import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import WalletContainer from 'containers/user/wallet';

const Wallet: NextPage<any> = (props) => (
  <Layout>
    <WalletContainer />
  </Layout>
);

export default Wallet;
