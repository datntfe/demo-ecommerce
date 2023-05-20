import React from 'react';
import Head from 'next/head';

import { DEFAULT_TITLE, SEO_IMAGE_DEFAULT, SEO_INFO } from 'config';

const SEO = ({ seoInfo }: any) => {
  const { title, description, seoImage, keywords, ogUrl } = seoInfo;
  return (
    <Head>
      <title>{title || DEFAULT_TITLE}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta
        name="description"
        content={description || SEO_INFO.HOME_PAGE.description}
      />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || SEO_INFO.HOME_PAGE.description}
      />
      <meta property="og:url" content={ogUrl ?? title} />
      <meta property="og:image" content={`${seoImage || SEO_IMAGE_DEFAULT}`} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description || SEO_INFO.HOME_PAGE.description}
      />
      <meta name="twitter:image" content={`${seoImage || SEO_IMAGE_DEFAULT}`} />
      {/* <link rel="canonical" href={ogUrl} /> */}
    </Head>
  );
};

export default SEO;
