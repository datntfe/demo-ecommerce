import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import AddressContainer from 'containers/user/account/AddressContainer';

const Address: NextPage<any> = (props) => (
  <Layout>
    <AddressContainer />
  </Layout>
);

export default Address;
