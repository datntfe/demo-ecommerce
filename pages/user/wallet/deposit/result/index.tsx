import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import ResultContainer from 'containers/user/wallet/Result';

const Result: NextPage<any> = (props) => (
  <Layout>
    <ResultContainer />
  </Layout>
);

export default Result;
