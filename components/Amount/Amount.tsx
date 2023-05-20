import React from 'react';
import classNames from 'classnames';

import Button, { EButtonStyleType } from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import { TAmountProps } from './Amount.types';

const Amount: React.FC<TAmountProps> = ({
  className,
  min,
  max,
  value = min || 0,
  // disabled,
  step = 1,
  onChange,
}) => {
  const handleMinus = (): void => {
    if (value > (min || Number.MIN_SAFE_INTEGER)) {
      const newValue = value - step;
      onChange?.(newValue);
    }
  };

  const handlePlus = (): void => {
    if (value < (max || Number.MAX_SAFE_INTEGER)) {
      const newValue = value - step;
      onChange?.(newValue);
    }
  };

  return (
    <div className={classNames('Amount', className)}>
      <div className="Amount-wrapper d-flex align-items-center justify-content-center">
        <Button
          styleType={EButtonStyleType.BLACK}
          icon={<Icon name={EIconName.Minus} color={EIconColor.WHITE} />}
          onClick={handleMinus}
        />
        <div className="Amount-value">{value}</div>
        <Button
          styleType={EButtonStyleType.BLACK}
          icon={<Icon name={EIconName.Plus} color={EIconColor.WHITE} />}
          onClick={handlePlus}
        />
      </div>
    </div>
  );
};

export default Amount;
