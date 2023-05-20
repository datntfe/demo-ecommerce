export interface IProduct {
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

export interface ProductsByCategory {
  id: number;
  name: string;
  image: string;
  products: IProduct[];
}

export interface DataHome {
  favoriteProducts: IProduct[];
  productsByCategory: ProductsByCategory[];
}

export interface IResponseHomePage {
  status: boolean;
  message: string;
  data: DataHome;
  totalRecord: number;
  totalPaging: number;
}

export interface IResponseBiddingProcess {
  inDeposit: IProduct[];
  inProcess: IProduct[];
}

interface MainAdvMedia {
  type: number;
  thumbnail: string;
  url: string;
  title: string;
  titleColor: string;
  text: string;
  textColor: string;
  redirectType: number;
  redirectCode: number;
}

export interface HomePageProduct {
  productId: number;
  sku: string;
  picture: string;
  name: string;
  displayPrice: number;
  marketPrice: number;
  discountPercent: number;
  isInWishList: boolean;
  brand: string;
  isInBidding: boolean;
  sold: number;
  inventory: number;
  rating: number;
  numberOfRating: number;
  biddingType: number;
}

export interface BrandBanner {
  brandId: string;
  brandName: string;
  brandImage: string;
}

export interface IResponseHomePageLuxury {
  mainAdvMedia: MainAdvMedia[];
  limitedProducts: {
    endingTime: number;
    items: HomePageProduct[];
  };
  suggestProducts: HomePageProduct[];
  middleAdvMedia: MainAdvMedia[];
  outstandingBrand: {
    banner: MainAdvMedia;
    items: BrandBanner[];
  };
  hotDeal: {
    banner: MainAdvMedia;
    items: HomePageProduct[];
  };
}
