import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TShopCardProps = {
  className?: string;
  logo?: string;
  title: string;
  subtitle: string;
  description?: string;
  showShop?: boolean;
  background?: string;
  amountProduct: string;
  percentResponse: string;
  response: string;
  size?: SizeType;
};
