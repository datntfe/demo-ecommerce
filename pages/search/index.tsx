import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import ProductsList from 'containers/ProductsList';
import GuestLayout from 'layouts/GuestLayout';
import Breadcrumb from 'components/Breadcrumb';
import { Paths } from 'routers';
import FilterCategory from 'containers/FilterCategory';
import ShopCard from 'components/ShopCard';
import Link from 'next/link';
import Empty from 'components/Empty';

const SearchPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [visibleFilter, setVisibleFilter] = useState<boolean>(true);

  const dataBreadcrumb = [
    { link: Paths.Home, key: 'home', title: 'Trang Chủ' },
    { key: 'search', title: 'Tìm Kiếm' },
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
      <div className="SearchPage">
        <div className="SearchPage-wrapper">
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

                <div className="SearchPage-header d-flex align-items-center justify-content-between">
                  <div className="SearchPage-header-item">
                    <div className="SearchPage-header-search-text">
                      Tìm kiếm kết quả cho: <span>“dong ho”</span>
                    </div>
                  </div>
                  <div className="SearchPage-header-item">
                    <Link href="#" passHref>
                      <a className="SearchPage-header-see-all">XEM TẤT CẢ</a>
                    </Link>
                  </div>
                </div>

                <ShopCard
                  logo="/img/logo-shop.png"
                  background="/img/bg-shop.png"
                  title="Louis Vuitton"
                  subtitle="Louis Vuitton Store"
                  size="small"
                  amountProduct="219"
                  percentResponse="100%"
                  response="Trong vài giờ"
                  showShop
                />

                <Empty text="Không có sản phẩm phù hợp với nội dung tìm kiếm" />

                <ProductsList
                  colXlSpan={visibleFilter ? 8 : 6}
                  colSpan={visibleFilter ? 12 : 8}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {isMobile && (
        <FilterCategory
          visible={visibleFilter}
          onClose={handleCloseFilterCategory}
        />
      )}
    </GuestLayout>
  );
};

export default SearchPage;
