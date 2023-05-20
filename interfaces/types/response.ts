import { ICollection } from './collectionLasted';
import { IDesign } from './design';
import { IFetchDesign } from './params';

export interface IResponseFetchDesign {
  quanity?: number;
  totalPage?: number;
  query?: IFetchDesign;
  pageDesigns?: IDesign[];
  collections?: Array<ICollection>;
  tags?: Array<string>;
}
