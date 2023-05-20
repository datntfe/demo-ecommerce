import React from 'react';
import classNames from 'classnames';
import { Slider as AntdSlider } from 'antd';

import { TSliderProps } from './Slider.types';

const Slider: React.FC<TSliderProps> = ({
  className,
  range,
  value,
  min,
  max,
  step,
  onChange,
}) => (
  <div className={classNames('Slider', className)}>
    <AntdSlider
      range={range}
      value={value}
      min={min}
      max={max}
      step={step}
      tooltipVisible={false}
      onChange={onChange}
    />
  </div>
);

export default Slider;
