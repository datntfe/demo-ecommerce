import React from 'react';
import { Col, Row } from 'antd';

import Slider from 'components/Slider';
import { formatCurrency } from 'utils/functions';

import Input from 'components/Input';
import { TPricesFormProps } from './PricesForm.types';

const PricesForm: React.FC<TPricesFormProps> = ({
  value = [0, 0],
  onChange,
  min = 0,
  max = 0,
}) => {
  const quickPriceOptions = [
    { label: 'Dưới 50.000.000', value: [min, 50000000] },
    { label: 'Dưới 200.000.000', value: [min, 200000000] },
    { label: 'Dưới 500.000.000', value: [min, 500000000] },
    { label: 'Trên 500.000.000', value: [500000000, max] },
  ];
  return (
    <div className="PricesForm">
      <div className="PricesForm-options">
        <Row gutter={[16, 16]}>
          {quickPriceOptions.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} span={12}>
              <div
                className="PricesForm-options-item"
                onClick={(): void => onChange?.(item.value)}
              >
                {item.label}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="PricesForm-text">Hoặc nhập giá ở ô dưới đây:</div>

      <div className="PricesForm-form d-flex align-items-center">
        <Input
          value={String(value[0])}
          placeholder={`Từ ${formatCurrency({ amount: min })}`}
          suffix="đ"
          noAffixBorder
          numberic
          onChange={(changedValue): void => {
            const isCanChange =
              Number(changedValue || 0) <= (Number(value[1] || 0) || max);

            isCanChange && onChange?.([Number(changedValue || 0), value[1]]);
          }}
        />
        <span>-</span>
        <Input
          value={String(value[1])}
          placeholder={`Đến ${formatCurrency({ amount: max })}`}
          suffix="đ"
          noAffixBorder
          numberic
          onChange={(changedValue): void => {
            const isCanChange =
              Number(changedValue || 0) >= (Number(value[0] || 0) || min);

            isCanChange && onChange?.([value[0], Number(changedValue || 0)]);
          }}
        />
      </div>

      <div className="PricesForm-text-value">
        {formatCurrency({ amount: value[0] || min, showSuffix: true })} -{' '}
        {formatCurrency({ amount: value[1] || max, showSuffix: true })}
      </div>

      <div className="PricesForm-slider">
        <Slider
          range
          value={[value[0] || min, value[1] || max]}
          min={min}
          max={max}
          step={1000}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PricesForm;
