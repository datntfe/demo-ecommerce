import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import { connect, ConnectedProps } from 'react-redux';
import BrandDetailContainer from 'containers/brandDetail';
import { RootState } from 'redux/reducer';
import { setInitSearchData } from 'redux/action/search';
import { BrandBanner, HomePageProduct } from 'interfaces/response/home';
import { getBrandDetail } from 'services/brand';

const BrandDetailPage: NextPage<PropsFromRedux> = (props) => {
  const { brand, products } = props;

  return (
    <Layout>
      <BrandDetailContainer brand={brand} products={products} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { brandId } = context.query;
  let brand = {} as BrandBanner;
  let products = [] as HomePageProduct[];
  try {
    const result = await getBrandDetail(brandId as string);
    brand = result.data.data.brand;
    products = result.data.data.products;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      brand,
      products,
    },
  };
};

interface BrandDetailPageProps {
  brand: BrandBanner;
  products: HomePageProduct[];
}

const mapStateToProps = (state: RootState, ownProps: BrandDetailPageProps) => ({
  ...ownProps,
  cdnHost: process.env.prefixCdn,
});

const connector = connect(mapStateToProps, {
  setInitSearchDataAction: setInitSearchData,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BrandDetailPage);
