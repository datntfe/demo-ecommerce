import Cookie from 'cookie-universal';

export const cookies = Cookie();

export const grantType = 'Bearer';
export const defautToken = '';
export const maximumDuration = 180;

export const HostAPIENV =
  process.env.addressApi ?? 'https://backend-stag.shopdi.io';

export const DEFAULT_TITLE = 'Shopdi.com.vn | Săn cực phẩm giá cực sốc';

export const SEO_IMAGE_DEFAULT =
  'https://cdn.autonomous.ai/static/images/home/1a.jpg';

export const SEO_INFO = {
  HOME_PAGE: {
    title: 'Shopdi - Săn cực phẩm, giá cực sốc',
    description:
      'Shopdi - mô hình thương mại điện tử thế hệ mới ứng dụng công nghệ blockchain, dành riêng cho sản phẩm cao cấp và sản phẩm giới hạn, nơi giá bán được quyết định bởi số lượng người quan tâm.',
    seoImage: 'content="https://shopdi.com.vn',
    keywords: 'shopdi, ecommerce, rare item',
  },
};
