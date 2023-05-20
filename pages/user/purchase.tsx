import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import PurchaseContainer from 'containers/user/purchase';

const Purchase: NextPage<any> = (props) => (
  <Layout>
    <PurchaseContainer />
  </Layout>
);

export default Purchase;
