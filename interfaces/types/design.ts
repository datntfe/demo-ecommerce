import { ICollection } from './collectionLasted';

export interface IDesign {
  designId: number;
  hashId: string;
  shopId: number;
  collectionId: number;
  shopIdHash: string;
  description?: any;
  title: string;
  tagNames?: string[];
  images: string[];
  heightOnSale: number[];
  image: string;
  width: number;
  height: number;
  maxHeight: number;
  maxWidth: number;
  ratio: number;
  dimensionWith: number;
  dimensionHeight: number;
  raw: string;
  createAt: Date;
  isVisible: boolean;
  resultSearchImg?: Array<ResultSearchImg>;
  score?: number;
  hasDup?: boolean;
  resultSearchImgDesign?: Array<any>;
  widthtOnSale: Array<number>;
  priceOnSale: Array<number>;
  collection: ICollection;
}

export interface ResultSearchImg {
  designId: number;
  score: number;
}

export interface IDesignCart extends IDesign {
  quanity: number;
  price: number; // Gia
  total: number; // Thanh tien
  code: string; // hashId_height
}
