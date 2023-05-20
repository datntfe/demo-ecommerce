const withSvgr = require("next-plugin-svgr");

module.exports = withSvgr({
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'shopdi.io','frontend-stag.shopdi.io','sellercenter.shopdi.com.vn','mgnt-beta.shopdi.io','api-beta.shopdi.io','mgt.cdn.shopdi.com.vn'],
  },
  env: {
    prefixCdn: process.env.prefixCdn,
    addressApi: process.env.addressApi,
    REACT_APP_FACEBOOK_ID: process.env.REACT_APP_FACEBOOK_ID,
    REACT_APP_GOOGLE_ID: process.env.REACT_APP_GOOGLE_ID,
    REACT_APP_UNDER_CONSTRUCTION: process.env.REACT_APP_UNDER_CONSTRUCTION,
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_SOCKET_URL: process.env.REACT_SOCKET_URL,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ["vn", "en"],
    defaultLocale: "vn",
    localeDetection: false,
  },
});
