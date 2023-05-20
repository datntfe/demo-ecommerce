import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import { connect, ConnectedProps } from 'react-redux';
import BrandsContainer from 'containers/brands';
import { RootState } from 'redux/reducer';
import { setInitSearchData } from 'redux/action/search';
import { BrandBanner } from 'interfaces/response/home';
import { getAllBrands } from 'services/brand';

const BrandsPage: NextPage<PropsFromRedux> = (props) => {
  const { brands } = props;
  return (
    <Layout>
      <BrandsContainer brands={brands} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let resultSearch = [] as BrandBanner[];
  try {
    const data = await getAllBrands();
    resultSearch = data.data.data;
  } catch (ex) {
    console.log('error', ex);
  }

  return {
    props: {
      brands: resultSearch,
    },
  };
};

interface BrandsPageProps {
  brands: BrandBanner[];
}

const mapStateToProps = (state: RootState, ownProps: BrandsPageProps) => ({
  ...ownProps,
  cdnHost: process.env.prefixCdn,
});

const connector = connect(mapStateToProps, {
  setInitSearchDataAction: setInitSearchData,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BrandsPage);
