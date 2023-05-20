export interface IFetchDesign {
  tags?: string[];
  keywords?: string;
  keywordsFull?: string;
  storeId?: number;
  collectionIds?: Array<number>;
  asc?: boolean;
  page?: number;
  pageSize: number;
  sortField?: string;
  visibleOnly?: boolean;
  collectionHashIds?: string[];
  storeHashIds?: string[];
  categoryHashIds?: string[];
  checkDupplicate?: boolean;
}

interface IBackendCommon {
  headers?: any;
}

export interface IParamGetDesignByIdHash extends IBackendCommon {
  idHash: any;
}
