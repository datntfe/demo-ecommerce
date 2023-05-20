export interface PackageAffiliateEntity {
  id: string;
  name: string;
  icon: string;
  description: string;
  limits: number;
  profit: number;
  active: boolean;
}

export interface MyAffiliateInfo {
  packageId: string;
  packageName: string;
  packageIcon: string;
  packageLimits: number;
  packageProfit: number;
  affCode: number;
  linkRef: string;
  totalProfit: number;
  topProfit: number;
  presenterCode: string;
}

export interface AffiliateTransactionEntity {
  test: any;
  id: string;
}
