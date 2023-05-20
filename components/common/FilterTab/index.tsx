import React from 'react';
import styled from 'styled-components';

export interface StyledFilterProps {
  isActive: boolean;
  length: number;
}

const StyledFilter = styled.div<StyledFilterProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: ${(props) => (props.isActive ? '#000000' : '#eeeeee')};
  color: ${(props) => (props.isActive ? '#FFC200' : '#888888')};
  border-radius: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  width: ${(props) => `calc(100% / ${props.length})`};
  text-transform: capitalize;
`;

interface FilterTabProps {
  items: { title: string; id: number }[];
  isActive: number;
  onclick: (id: number) => void;
}
const FilterTab: React.FC<FilterTabProps> = ({ items, isActive, onclick }) => (
  <div className="d-flex align-items-center bg-gray4 justify-content-between p-1 w-100">
    {items.map((item) => (
      <StyledFilter
        isActive={item.id === isActive}
        key={item.id}
        onClick={() => onclick(item.id)}
        length={items.length}
      >
        {item.title}
      </StyledFilter>
    ))}
  </div>
);

export default FilterTab;
