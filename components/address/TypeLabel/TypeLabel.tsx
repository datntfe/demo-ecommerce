import Icon, { IconName } from 'components/common/Icon';
import React from 'react';

interface TypeLabelProps {
  name?: IconName;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const TypeLabel: React.FC<TypeLabelProps> = ({
  name,
  label,
  isActive,
  onClick,
}) => (
  <div
    className={`label-address headline-04 ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {name && (
      <div className="mrt-1 mb-1">
        <Icon name={name} color={isActive ? '#FFC200' : ''} />
      </div>
    )}
    <div>{label}</div>
  </div>
);

export default TypeLabel;
