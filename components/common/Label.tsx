import React from 'react';
import styled from 'styled-components';

interface WrapStyledProps {
  color: string;
  borderRadius?: string;
  fontSize?: string;
}
const WrapStyled = styled.button<WrapStyledProps>`
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: ${(props) => (props.borderRadius ? `${props.borderRadius}px` : '4px')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '13px')};
  padding: 3px 5px;
  display: flex;
  justify-content: center;
`;

interface LabelButtonProps {
  title: string;
  color: string;
  borderRadius?: string;
  fontSize?: string;
}

const LabelButton: React.FC<LabelButtonProps> = ({ title, color, borderRadius, fontSize }) => {
  if (!title) {
    return null;
  }

  return (
    <WrapStyled color={color} borderRadius={borderRadius} fontSize={fontSize}>
      {title}
    </WrapStyled>
  );
};

export default LabelButton;
