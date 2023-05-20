import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import ProductsList from 'containers/ProductsList';
import GuestLayout from 'layouts/GuestLayout';
import Breadcrumb from 'components/Breadcrumb';
import { Paths } from 'routers';
import Banner from 'components/Banner';
import FilterCategory from 'containers/FilterCategory';
import Tabs from 'components/Tabs';

const CategoryPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [visibleFilter, setVisibleFilter] = useState<boolean>(true);

  const dataBreadcrumb = [
    { link: Paths.Home, key: 'home', title: 'Trang Chủ' },
    { key: 'search', title: 'Tìm Kiếm' },
    { key: 'type', title: 'Danh Mục' },
  ];

  const dataCategoryTabsOptions = [
    {
      key: 'limited',
      title: 'Sản phẩm giới hạn',
      children: (
        <ProductsList
          colXlSpan={visibleFilter ? 8 : 6}
          colSpan={visibleFilter ? 12 : 8}
        />
      ),
    },
    {
      key: 'popular',
      title: 'Phổ biến',
      children: (
        <ProductsList
          colXlSpan={visibleFilter ? 8 : 6}
          colSpan={visibleFilter ? 12 : 8}
        />
      ),
    },
    {
      key: 'bestSeller',
      title: 'Bán chạy',
      children: (
        <ProductsList
          colXlSpan={visibleFilter ? 8 : 6}
          colSpan={visibleFilter ? 12 : 8}
        />
      ),
    },
    {
      key: 'newProducts',
      title: 'Sản phẩm mới',
      children: (
        <ProductsList
          colXlSpan={visibleFilter ? 8 : 6}
          colSpan={visibleFilter ? 12 : 8}
        />
      ),
    },
  ];

  const handleOpenFilterCategory = (): void => {
    setVisibleFilter(true);
  };

  const handleCloseFilterCategory = (): void => {
    setVisibleFilter(false);
  };

  useEffect(() => {
    setVisibleFilter(!isMobile);
  }, [isMobile]);

  return (
    <GuestLayout>
      <div className="CategoryPage">
        <div className="CategoryPage-wrapper">
          <div className="container">
            <Breadcrumb options={dataBreadcrumb} />

            <Row gutter={[20, 20]} wrap={false}>
              {visibleFilter && !isMobile && (
                <Col>
                  <FilterCategory onClose={handleCloseFilterCategory} />
                </Col>
              )}
              <Col flex={1}>
                {(!visibleFilter || isMobile) && (
                  <div
                    className="FilterCategory-toggle"
                    onClick={handleOpenFilterCategory}
                  >
                    Hiện bộ lọc
                  </div>
                )}

                <Banner
                  src="/img/image-category.png"
                  width="100%"
                  height="28rem"
                >
                  <div className="Banner-wrapper d-flex align-items-center justify-content-center">
                    <div className="Banner-herotitle">IPHONE 13</div>
                  </div>
                </Banner>

                <Tabs data={dataCategoryTabsOptions} />
              </Col>
            </Row>
          </div>
        </div>
        {isMobile && (
          <FilterCategory
            visible={visibleFilter}
            onClose={handleCloseFilterCategory}
          />
        )}
      </div>
    </GuestLayout>
  );
};

export default CategoryPage;
