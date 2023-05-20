export interface ProductItem {
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  summary?: any;
  description: string;
  images: string[];
  quantity: number;
  totalSold: number;
  rating: number;
  totalReviews: number;
  isBidding: boolean;
  lockedTime?: any;
  viewPrice: number;
  depositPrice: number;
  sessionId?: any;
  poolId?: any;
  id: number;
  sku: string;
  name: string;
  thumbnail: string;
  originalPrice: number;
  discountPrice: number;
  isHot: number;
  discountMin: number;
  discountMax: number;
  expireTime: string;
  exchangePoint: number;
  isWishlisted: number;
  totalWishlist: number;
  quanityInCart?: number;
  attribute: Array<IAttributeProduct>;
  allowBidding: boolean;
  breadcrumbs: Array<IBreadcrumb>;
  thumbnailImages?: string;
  productId: any;
  weight: number;
  store?: IProductStore;
  defaultTimeBidding: number;
  additionalAttr: { code: string; label: string; value: string }[];
  biddingType: number;
  discountPercent: number;
}

export interface IProductStore {
  storeId: string;
  storeCode: string;
  storeName: string;
  logo: string;
  banner: string;
  follower: number;
  rating: number;
  totalProduct: number;
  createAt: string;
  cancelPercent: number;
  cancelRefund: number;
  shipping: number;
  verified: number;
}

export interface IAttributeProduct {
  attributeId: string;
  attributeName: string;
  options: Array<IAttributeProductOptions>;
}

export interface IAttributeProductOptions {
  lable: string;
  value: string;
}

export interface SearchProduct {
  biddingStatus: number;
  brandName: string;
  endingIn: string;
  isHot: boolean;
  isInBidding: boolean;
  isInWishList: boolean;
  listPrice: number;
  name: string;
  productId: number;
  ratingNumber: number;
  ratingStar: number;
  salesType: number;
  shippingType: number;
  shopXuToDeposit: number;
  shopXuToView: number;
  sku: string;
  thumbnailImages: string;
  wishlistCount: number;
}

export interface IReponseProductDetail {
  status: boolean;
  message: string;
  data: ProductItem;
  totalRecord: number;
  totalPaging: number;
}

export interface IAttributeProductValues {
  attributeId: string;
  value: string;
}
export interface IBreadcrumb {
  name: string;
  id: string;
}

export interface IReponseProductSkuPrice {
  productId: number;
  sku: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  qty: number;
  images: string[];
}

export interface Attribute {
  attributeCode: string;
  value: string[];
}
export interface IRequestSearchProduct {
  store?: string;
  categoryId?: string;
  keyword?: string;
  priceFrom?: string;
  priceTo?: string;
  pageSize?: number;
  pageIndex?: number;
  rating?: string;
  attributes?: Attribute[];
}
