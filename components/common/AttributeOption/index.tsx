import React from 'react';
import styled from 'styled-components';

interface StyledAttributeProps {
  isActive: boolean;
  size: number;
  borderNone?: boolean;
}

const StyledAttribute = styled.div<StyledAttributeProps>`
  border-radius: 8px;
  margin-right: 8px;
  color: ${(props) => (props.isActive ? '#000000' : '#666666')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}px`};
  padding: 7px 0px;
  border: ${(props) =>
    props.isActive ? `2px solid #000000` : `1.5px solid #CCCCCC`};
  cursor: pointer;
  margin-bottom: 10px;
`;

interface AttributeOptionProps {
  name: string;
  id: string;
  size: number;
  isActive: boolean;
  onClick: (id: string) => void;
  borderNone?: boolean;
}

const AttributeOption: React.FC<AttributeOptionProps> = ({
  name,
  id,
  size,
  isActive,
  onClick,
  borderNone,
}) => (
  <StyledAttribute
    isActive={isActive}
    size={size}
    onClick={() => onClick(id)}
    borderNone={borderNone}
  >
    {name}
  </StyledAttribute>
);
export default AttributeOption;
