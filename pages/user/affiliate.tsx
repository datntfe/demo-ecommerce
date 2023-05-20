import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import AffiliateContainer from 'containers/user/affiliate';

const Affiliate: NextPage<any> = (props) => (
  <Layout>
    <AffiliateContainer />
  </Layout>
);

export default Affiliate;
