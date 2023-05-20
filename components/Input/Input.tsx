import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Input as AntdInput } from 'antd';

import { ETimeoutDebounce } from 'common/enums';
import { useDebounce } from 'utils/hooks';

import { TInputProps } from './Input.types';

const Input: React.FC<TInputProps> = ({
  className,
  type,
  size,
  placeholder,
  prefix,
  suffix,
  value,
  disabled,
  readOnly,
  noAffixBorder,
  numberic,
  onChange,
  onSearch,
  onEnter,
  onClick,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchValueDebounce = useDebounce(keyword, ETimeoutDebounce.SEARCH);

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onEnter?.();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value: inputValue } = e.target;
    setKeyword(inputValue);

    if (numberic) {
      const reg = /^-?\d*(\d*)?$/;
      const isNumbericPass = reg.test(inputValue) || inputValue === '';
      onChange?.(isNumbericPass ? inputValue : '');
    } else {
      onChange?.(inputValue);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) onSearch?.(searchValueDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValueDebounce]);

  return (
    <div
      className={classNames('Input', className, {
        affix: suffix || prefix,
        'no-affix-border': noAffixBorder,
      })}
    >
      <AntdInput
        type={type}
        size={size}
        onClick={onClick}
        placeholder={placeholder}
        value={onSearch ? keyword : value}
        prefix={prefix && <div className="Input-prefix">{prefix}</div>}
        suffix={suffix && <div className="Input-suffix">{suffix}</div>}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
    </div>
  );
};

export default Input;
