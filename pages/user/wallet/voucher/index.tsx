import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import WalletVoucherContainer from 'containers/user/wallet/voucher';

const Wallet: NextPage<any> = (props) => (
  <Layout>
    <WalletVoucherContainer />
  </Layout>
);

export default Wallet;
