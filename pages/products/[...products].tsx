import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import ProductContainer from 'containers/productDetail';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import {
  getProductBySku,
  getProductRelatedBySku,
  getProductsReview,
} from 'services/products';
import { ProductItem } from 'interfaces/response/products';
import Link from 'next/link';
import { getListDataCart } from 'redux/action/cart';
import { RootState } from 'redux/reducer';
import { getSystemStatus } from 'redux/action/user';
import { IProduct } from 'interfaces/response/home';
import { SEO_INFO } from 'config';

const ProductDetail: NextPage<PropsFromRedux> = (props) => {
  const { product, productsRelated, getSystemStatusAction } = props;
  const profileData = useSelector((state: RootState) => state.user.profile);
  useEffect(() => {
    if (profileData) {
      // getListDataCartAction();
      getSystemStatusAction();
    }
  }, [profileData?.userId]);

  return (
    <Layout>
      <div style={{ backgroundColor: '#FAFAFA', padding: '32px 0 184px' }}>
        {product ? (
          <ProductContainer
            product={product}
            productsRelated={productsRelated}
          />
        ) : (
          <div className="container">
            <div
              style={{
                minHeight: '50vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <span> Not found</span>
              <br />
              <p>
                <Link href="/">
                  <a>Click here to back Home</a>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req } = context;
  const { products } = query;
  let seoInfo = {
    title: SEO_INFO.HOME_PAGE.title,
    description: SEO_INFO.HOME_PAGE.description,
    seoImage: SEO_INFO.HOME_PAGE.seoImage,
    keywords: SEO_INFO.HOME_PAGE.keywords,
  };

  const {
    cookies: { token },
  } = req;
  const paramSlugs = products as Array<string>;

  const sku = paramSlugs[0];
  let message = '';
  let product = null;
  let productsRelated: IProduct[] = [];
  // let rating;

  await Promise.all([
    getProductBySku(encodeURIComponent(sku), token || ''),
    getProductRelatedBySku(encodeURIComponent(sku)),
  ])
    .then((data) => {
      productsRelated = data[1].data.data;
      product = data[0].data.data;
      message = data[0].data.message;

      seoInfo = {
        title: product.metaTitle ?? product.name,
        description: product.metaDescription,
        seoImage: product.thumbnailImages ?? product.thumbnail,
        keywords: product.metaKeyword,
      };
    })
    .catch((error) => {
      console.log('Error API resultSuggest', error);
    });

  return {
    props: {
      sku,
      product,
      message,
      productsRelated,
      seoInfo,
      // rating,
      // context,
    },
  };
};

interface ProductDetailProps {
  sku: string;
  product: ProductItem;
  productsRelated: IProduct[];
  message: string;
  context?: any;
}
const mapStateToProps = (state: any, ownProps: ProductDetailProps) => ({
  ...ownProps,
});
const connector = connect(mapStateToProps, {
  getListDataCartAction: getListDataCart,
  getSystemStatusAction: getSystemStatus,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ProductDetail);
