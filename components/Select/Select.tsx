import React, { useEffect, useState } from 'react';
import { Select as AntdSelect } from 'antd';
import classNames from 'classnames';

import { getTotalPage, searchString } from 'utils/functions';
import { useDebounce } from 'utils/hooks';
import { ETimeoutDebounce } from 'common/enums';
import WrapperLazyLoad from 'components/WrapperLazyLoad';
import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TSelectProps } from './Select.types';

const Select: React.FC<TSelectProps> = ({
  placeholder,
  disabled,
  options = [],
  showSearch,
  value,
  className,
  defaultValue,
  allowClear,
  dropdownClassName,
  paginate,
  size,
  label,
  required,
  open,
  onSearch,
  onLoadMore,
  onChange,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchValueDebounce = useDebounce(keyword, ETimeoutDebounce.SEARCH);

  const filterOption = (input: string, option: any): boolean =>
    searchString(option.label, keyword);

  const handleSearch = (keywordValue: string): void => {
    setKeyword(keywordValue);
  };

  const handleScrollEnd = (): void => {
    if (onSearch && paginate) {
      const isLoadMore =
        paginate.page < getTotalPage(paginate.total, paginate.pageSize);
      if (isLoadMore) {
        onLoadMore?.();
      }
    }
  };

  const dropdownRender = (menu: React.ReactElement): React.ReactElement => (
    <div className={classNames('Select-dropdown-wrapper', dropdownClassName)}>
      <div className="Select-dropdown-main">
        <WrapperLazyLoad maxHeight={256} onEnd={handleScrollEnd}>
          {menu}
        </WrapperLazyLoad>
      </div>
    </div>
  );

  const handleClear = (): void => {
    onChange?.(null);
  };

  useEffect(() => {
    if (isMounted && onSearch) {
      onSearch?.(searchValueDebounce);
    }

    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValueDebounce]);

  return (
    <div className={classNames('Select', className)}>
      {label && (
        <div className={classNames('Select-label', { disabled })}>
          {label}
          {required && <span>*</span>}
        </div>
      )}

      <AntdSelect
        value={value}
        showSearch={showSearch}
        placeholder={placeholder}
        defaultValue={defaultValue}
        labelInValue
        size={size}
        open={open}
        allowClear={allowClear}
        filterOption={onSearch ? false : filterOption}
        onSearch={handleSearch}
        options={options}
        searchValue={keyword}
        suffixIcon={
          <Icon name={EIconName.AngleDown} color={EIconColor.SILVER} />
        }
        dropdownClassName={classNames('Select-dropdown', dropdownClassName)}
        getPopupContainer={(trigger: HTMLElement): HTMLElement => trigger}
        onChange={onChange}
        onClear={handleClear}
        dropdownRender={dropdownRender}
        disabled={disabled}
        virtual={false}
      />
    </div>
  );
};

export default Select;
