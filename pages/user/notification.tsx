import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import NotificationContainer from 'containers/user/notification';

const Notification: NextPage<any> = (props) => (
  <Layout>
    <NotificationContainer />
  </Layout>
);

export default Notification;
