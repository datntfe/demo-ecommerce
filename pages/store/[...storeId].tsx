import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import StoreContainer from 'containers/store/StoreContainer';
import { setInitSearchData } from 'redux/action/search';
import { connect, ConnectedProps } from 'react-redux';
import { getStoreDetail, getStoreProduct } from 'services/store';
import { StoreEntity } from 'interfaces/response/store';
import { BaseResponsePagination } from 'interfaces/response/common';
import { HomePageProduct } from 'interfaces/response/home';

const StoreDetail: NextPage<PropsFromRedux> = (props) => {
  const { storeData, productsData } = props;

  return (
    <Layout>
      <div className="container">
        <StoreContainer storeData={storeData} productsData={productsData} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { storeId } = query;
  const paramSlugs = storeId as Array<string>;
  let resultSearch = {} as BaseResponsePagination<HomePageProduct[]>;
  const sku = paramSlugs?.[0] ?? '';
  let storeData = null;
  await Promise.all([
    getStoreDetail(sku),
    getStoreProduct(sku, {
      pageIndex: Number(query.pageIndex) ?? 1,
      pageSize: Number(query.pageSize) ?? 15,
    }),
  ])
    .then((data) => {
      storeData = data[0].data.data.store;
      resultSearch = data[1].data;
    })
    .catch((error) => {
      console.log('Error API resultSuggest', error);
    });
  return {
    props: {
      storeData,
      productsData: resultSearch,
    },
  };
};

interface ProductDetailProps {
  storeData?: StoreEntity;
  productsData: BaseResponsePagination<HomePageProduct[]>;
}
const mapStateToProps = (state: any, ownProps: ProductDetailProps) => ({
  ...ownProps,
});
const connector = connect(mapStateToProps, {
  setInitSearchDataAction: setInitSearchData,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StoreDetail);
