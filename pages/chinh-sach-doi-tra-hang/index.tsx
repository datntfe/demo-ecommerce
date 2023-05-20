import React, { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Layout from 'components/layout/layout';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducer';
import { setInitSearchData } from 'redux/action/search';
import { getContentPost, PageResponse } from 'services/categories';
import { useRouter } from 'next/router';

const TermsPage: NextPage<PropsFromRedux> = (props) => {
  const router = useRouter();
  const { locale } = router;
  const { data } = props;
  const [dataContent, setDataContent] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getContentPost(23);
        setDataContent(data.data.data.content);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, [locale]);

  return (
    <Layout>
      <div className="mt-5 mb-5 container">
        {locale === 'en' ? (
          <div dangerouslySetInnerHTML={{ __html: dataContent ?? '' }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let resultSearch = {} as PageResponse;
  try {
    const data = await getContentPost(18);
    resultSearch = data.data.data;
  } catch (ex) {
    console.log('error', ex);
  }

  return {
    props: {
      data: resultSearch,
    },
  };
};

interface TermsPageProps {
  data: PageResponse;
}

const mapStateToProps = (state: RootState, ownProps: TermsPageProps) => ({
  ...ownProps,
  cdnHost: process.env.prefixCdn,
});

const connector = connect(mapStateToProps, {
  setInitSearchDataAction: setInitSearchData,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(TermsPage);
