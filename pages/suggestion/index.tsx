import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import { connect, ConnectedProps } from 'react-redux';
import SuggestionProduct from 'containers/suggestion';
import { RootState } from 'redux/reducer';
import { getProductsByTypeServices } from 'services/products';
import { setInitSearchData } from 'redux/action/search';
import { BaseResponsePagination } from 'interfaces/response/common';
import { HomePageProduct } from 'interfaces/response/home';

const SuggestionProductPage: NextPage<PropsFromRedux> = (props) => {
  const { products } = props;
  return (
    <Layout>
      <SuggestionProduct products={products} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let resultSearch = {} as BaseResponsePagination<HomePageProduct[]>;
  try {
    const data = await getProductsByTypeServices(3);
    resultSearch = data.data;
  } catch (ex) {
    console.log('error', ex);
  }

  return {
    props: {
      products: resultSearch,
    },
  };
};

interface SuggestionProductPageProps {
  products: BaseResponsePagination<HomePageProduct[]>;
}

const mapStateToProps = (state: RootState, ownProps: SuggestionProductPageProps) => ({
  ...ownProps,
  cdnHost: process.env.prefixCdn,
});

const connector = connect(mapStateToProps, {
  setInitSearchDataAction: setInitSearchData,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SuggestionProductPage);
