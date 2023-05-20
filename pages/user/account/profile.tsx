import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import ProfileContainer from 'containers/user/account/ProfileContainer';

const Profile: NextPage<any> = (props) => (
  <Layout>
    <ProfileContainer />
  </Layout>
);

export default Profile;
