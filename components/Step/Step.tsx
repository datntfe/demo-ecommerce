import React from 'react';
import classNames from 'classnames';
import { Col, Row } from 'antd';

import { TStepProps, TStepData } from './Step.types';

const Step: React.FC<TStepProps> = ({
  showSingle,
  options,
  value,
  justify,
  onChange,
}) => {
  const stepOptions = showSingle
    ? options?.filter((option) => option.value === value?.value)
    : options;

  const handleChangeStep = (data: TStepData): void => {
    onChange?.(data);
  };

  return (
    <div className={classNames('Step')}>
      <div className="container">
        <div className="Step-wrapper">
          <Row gutter={[24, 24]} justify={justify || 'center'} wrap={false}>
            {stepOptions?.map((option, optionIndex) => (
              <Col>
                <div
                  key={option.key}
                  className={classNames('Step-item d-flex align-items-center', {
                    active: (value?.key || 0) === option.key,
                    pass: (value?.key || 0) >= option.key,
                  })}
                  onClick={(): void => handleChangeStep(option)}
                >
                  <div className="Step-item-circle">
                    {option.key || optionIndex + 1}
                  </div>
                  <div className="Step-item-label">{option.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Step;
