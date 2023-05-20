// @ts-ignore
import React from 'react';
import { Button as AntdButton } from 'antd';
import { useRouter } from 'next/router';

interface ButtonComponent {
  classNameOut?: string;
  className?: string;
  size?: any;
  type?: any;
  htmlType?: any;
  title?: string;
  danger?: boolean;
  reverse?: string;
  link?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const ButtonComponent = ({
  classNameOut,
  className,
  size,
  type,
  htmlType,
  title,
  danger,
  reverse,
  link,
  disabled,
  loading,
  onClick,
}: ButtonComponent) => {
  const router = useRouter();
  const handleClickButton = (): void => {
    if (link) router.push(link);
    else onClick?.();
  };
  return (
    <div className={`Button-component ${classNameOut}`}>
      <AntdButton
        size={size}
        type={type}
        htmlType={htmlType}
        onClick={handleClickButton}
        danger={danger}
        disabled={disabled}
        loading={loading}
        className={className}
      >
        <span className="Button-title">{title}</span>
      </AntdButton>
    </div>
  );
};

export default ButtonComponent;
