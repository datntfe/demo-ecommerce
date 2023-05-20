import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import MyOrderContainer from 'containers/myOrder/MyOrderDetail';

const MyOrderDetail: NextPage = (props) => (
  <Layout>
    <div className="container">
      <MyOrderContainer />
    </div>
  </Layout>
);

export default MyOrderDetail;
