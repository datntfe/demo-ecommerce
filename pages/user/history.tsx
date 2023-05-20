import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import HistoryContainer from 'containers/user/history';

const History: NextPage<any> = (props) => (
  <Layout>
    <HistoryContainer />
  </Layout>
);

export default History;
