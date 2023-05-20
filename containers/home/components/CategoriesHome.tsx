import { CategoriesData } from 'interfaces/response/categories';
import { useRouter } from 'next/router';
import Menu, { Item as MenuItem, SubMenu } from 'rc-menu';
import 'rc-menu/assets/index.css';
import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledMenuCategoryWrap = styled.div`
  width: 300px;
  border-right: 1px solid #eeeeee;
  .rc-menu {
    border: 0px solid #d9d9d9;
    box-shadow: unset;
  }

  ul.rc-menu-vertical {
    height: 448px;
    overflow: hidden;
    overflow-y: scroll;
  }

  .rc-menu-submenu-title {
    padding: 6px 8px 6px 24px !important;
  }

  h2 {
    color: ${theme.orange};
    padding-left: 25px;
    line-height: 48px;
    border-bottom: 1px solid #eeeeee;
  }
`;

interface ItemHomeProps {
  categoriesData: CategoriesData[];
}

const CategoriesHome: React.FC<ItemHomeProps> = (props) => {
  const router = useRouter();
  const { categoriesData } = props;
  const handleSelect = (info: any) => {
    // console.log('selected ', info);
  };

  return (
    <StyledMenuCategoryWrap>
      <h2>Danh mục</h2>
      <Menu onSelect={handleSelect}>
        {categoriesData.map((category) => {
          if (category.children_data) {
            return (
              <SubMenu
                key={`${category.id}_root`}
                title={<span>{category.name}</span>}
              >
                {category.children_data.map((child) => (
                  <MenuItem
                    onClick={() => {
                      router.push(`/search?categoryId=${child.id}`);
                    }}
                    key={`child_${child.id}`}
                  >
                    {child.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          }

          return (
            <MenuItem key={`root_${category.id}`}>{category.name}</MenuItem>
          );
        })}
      </Menu>
    </StyledMenuCategoryWrap>
  );
};

export default CategoriesHome;
