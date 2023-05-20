import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
// import './style.scss';

const StyledInput = styled.div`
  align-items: center;
  display: flex;
  button {
    width: 40px;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  span {
    @media only screen and (max-width: 1199px) {
      width: 40px;
    }
    width: 60px;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
    font-weight: bold;
  }
`;
export interface CCounterInputProps {
  min: number;
  max: number;
  count?: number;
  callback: (number: number) => void;
  isLoading?: boolean;
  disableIncrease?: boolean;
}

const CCounterInput: React.FC<CCounterInputProps> = ({
  min,
  max,
  count = 1,
  callback,
  isLoading,
  disableIncrease,
}) => {
  const [value, setValue] = useState(count);
  useEffect(() => {
    setValue(count);
  }, [count]);

  const handleDecrement = () => {
    if (value > min) {
      callback(value - 1);
      setValue((state) => state - 1);
    }
  };
  const handleIncrement = () => {
    if (value < max) {
      callback(value + 1);
      setValue((state) => state + 1);
    }
  };

  return (
    <StyledInput>
      <button
        className="btn-count button-left"
        onClick={handleDecrement}
        disabled={isLoading}
        type="button"
      >
        <Icon name="button-dec" />
      </button>

      <span className="count">{value}</span>
      <button
        className="btn-count button-right"
        onClick={handleIncrement}
        disabled={isLoading || disableIncrease}
        type="button"
      >
        <Icon name="button-inc" />
      </button>
    </StyledInput>
  );
};

export default CCounterInput;
