import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import CheckoutResultContainer from 'containers/myOrder/Result';
import { HomePageProduct } from 'interfaces/response/home';
import { recommendServices } from 'services/products';

interface CheckoutProps {
  recommendList: HomePageProduct[];
}

const Checkout: NextPage<CheckoutProps> = ({ recommendList }) => (
  <Layout>
    <CheckoutResultContainer recommendList={recommendList} />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  let recommendList = [] as HomePageProduct[];

  try {
    const data = await recommendServices();
    if (data.data.status) {
      recommendList = data.data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      recommendList,
    },
  };
};

export default Checkout;
