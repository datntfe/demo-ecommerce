import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import CommentContainer from 'containers/user/comment';

const Comment: NextPage<any> = (props) => (
  <Layout>
    <CommentContainer />
  </Layout>
);

export default Comment;
