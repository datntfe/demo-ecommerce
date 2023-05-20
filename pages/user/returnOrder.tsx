import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import ReturnOrderContainer from 'containers/user/returnOrder';

const ReturnOrder: NextPage<any> = (props) => (
  <Layout>
    <ReturnOrderContainer />
  </Layout>
);

export default ReturnOrder;
