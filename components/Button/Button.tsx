import React from 'react';
import classNames from 'classnames';

import { TButtonProps } from './Button.types';
import { EButtonStyleType } from './Button.enums';

const Button: React.FC<TButtonProps> = ({
  size = 'middle',
  primary,
  title,
  icon,
  reverse,
  disabled,
  radius = true,
  className,
  styleType = EButtonStyleType.PRIMARY,
  htmlType = 'button',
  onClick,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={htmlType}
    className={classNames('Button', className, size, styleType, {
      radius,
      primary,
      reverse,
      disabled,
    })}
    onClick={onClick}
  >
    {title && <div className="Button-title">{title}</div>}
    {icon && <div className="Button-icon">{icon}</div>}
  </button>
);

export default Button;
