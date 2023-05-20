import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TSelectProps = {
  className?: string;
  placeholder?: string;
  value?: TSelectOption;
  options?: TSelectOption[];
  showSearch?: boolean;
  disabled?: boolean;
  defaultValue?: TSelectOption;
  allowClear?: boolean;
  dropdownClassName?: string;
  open?: boolean;
  paginate?: {
    page: number;
    pageSize: number;
    total: number;
  };
  size?: SizeType;
  label?: string;
  required?: boolean;
  onSearch?: (keyword: string) => void;
  onLoadMore?: () => void;
  onChange?: (option: TSelectOption | null) => void;
};

export type TSelectOption = {
  label: string;
  value: string;
  data?: any;
  disabled?: boolean;
};
