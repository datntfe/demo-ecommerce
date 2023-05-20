import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import TrackingOrderContainer from 'containers/myOrder/TrackingMyOrder';

const TrackingOrderDetail: NextPage = (props) => (
  <Layout>
    <div className="container">
      <TrackingOrderContainer />
    </div>
  </Layout>
);

export default TrackingOrderDetail;
