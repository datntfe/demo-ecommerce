import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import WalletTransferContainer from 'containers/user/wallet/Transfer';

const Wallet: NextPage<any> = (props) => (
  <Layout>
    <WalletTransferContainer />
  </Layout>
);

export default Wallet;
