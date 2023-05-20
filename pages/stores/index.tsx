import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import { connect, ConnectedProps } from 'react-redux';
import SearchStoreContainer from 'containers/searchStore';
import { RootState } from 'redux/reducer';
import { searchStoresServices } from 'services/products';
import { IRequestSearchProduct } from 'interfaces/response/products';
import { setInitSearchData } from 'redux/action/search';
import { StoreEntity } from 'interfaces/response/store';
import { BaseResponsePagination } from 'interfaces/response/common';

const SearchPage: NextPage<PropsFromRedux> = (props) => {
  const { setInitSearchDataAction } = props;

  useEffect(() => {
    setInitSearchDataAction({ query: props.query, response: props.response });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <Layout>
      <SearchStoreContainer response={props.response} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  let resultSearch = {} as BaseResponsePagination<StoreEntity[]>;
  try {
    const data = await searchStoresServices(query);
    resultSearch = data.data;
  } catch (ex) {
    console.log('error', ex);
  }

  return {
    props: {
      response: resultSearch,
      query,
      // dataSearcy,
      // hashId: stickerIdhash,
    },
  };
};

interface SearchPageProps {
  response: BaseResponsePagination<StoreEntity[]>;
  query: IRequestSearchProduct;
}

const mapStateToProps = (state: RootState, ownProps: SearchPageProps) => ({
  ...ownProps,
  cdnHost: process.env.prefixCdn,
});

const connector = connect(mapStateToProps, {
  setInitSearchDataAction: setInitSearchData,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SearchPage);
