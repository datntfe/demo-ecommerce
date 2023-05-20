import React from 'react';
import NextLink from 'next/link';

import { convertToSlug } from 'utils';
// var getSlug = require('speakingurl');
const LinkSticker = ({ children, design }: any) => (
  <NextLink
    href={{
      pathname: `/sticker/${convertToSlug(design.title)}/${design.hashId}`,
    }}
  >
    <a>{children}</a>
  </NextLink>
);

export default LinkSticker;
