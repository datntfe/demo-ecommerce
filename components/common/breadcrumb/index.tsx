import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import theme from 'styles/theme';
import Icon from '../Icon';

const StyledBreadcrumb = styled.div`
  display: flex;
  align-items: center;

  .link {
    color: ${theme.neutral_gray_7};

    &:hover {
      text-decoration: underline;
    }
  }

  svg path {
    fill: ${theme.neutral_gray_7};
  }

  @media only screen and (max-width: 1199px) {
    flex-wrap: wrap;
  }
`;

interface BreadcrumbProps {
  items: { name: string; path?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <StyledBreadcrumb>
    {items.map((item) => {
      if (item.path) {
        return (
          <div key={item.name} className="d-flex align-items-center">
            <Link href={item.path}>
              <a className="link headline-04">{item.name}</a>
            </Link>
            <span className="mb-1">
              <Icon name="breadcrumb" />
            </span>
          </div>
        );
      }
      return (
        <div key={item.name} className="headline-04">
          {item.name}
        </div>
      );
    })}
  </StyledBreadcrumb>
);

export default Breadcrumb;
