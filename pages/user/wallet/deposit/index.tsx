import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import WalletDepositContainer from 'containers/user/wallet/deposit';

const Deposit: NextPage<any> = (props) => (
  <Layout>
    <WalletDepositContainer />
  </Layout>
);

export default Deposit;
