import { Slider } from 'antd';
import Icon from 'components/common/Icon';
import ItemLuxuryProduct from 'components/ListItem/ItemLuxury';
import { StyledReactPaginate } from 'containers/searchProduct';
import { BaseResponsePagination } from 'interfaces/response/common';
import { HomePageProduct } from 'interfaces/response/home';
import { StoreEntity } from 'interfaces/response/store';
import { pickBy } from 'lodash';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';

const StoreContainer: React.FC<PropsFromRedux> = (props) => {
  const [activeTab, setActiveTab] = useState(2);
  const { productsData, storeData } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const listProducts = productsData.data ?? [];
  const pageSize = productsData.pageSize || 15;
  const pageIndex = productsData.pageIndex || 1;

  console.log(productsData);

  const handleChangePage = (selectedItem: { selected: number }) => {
    const test = qs.stringify(
      pickBy({
        pageSize,
        pageIndex: selectedItem.selected + 1,
      }),
    );
    router.push(`/store/${router?.query?.storeId?.[0]}/?${test}`);
  };
  return (
    <div id="store-page">
      <div className="header">
        <div className="d-flex align-items-center">
          <div className="avatar mr-3">
            <img src={storeData?.logo} alt="logo" />
          </div>
          <div className="header-center">
            <div className="name-store mb-2">{storeData?.storeName}</div>
            <div className="description-store">
              <Icon name="rate-star-full" />
              <span className="mt-1 ml-1">
                <span className="opacity-9">{storeData?.rating}/5 |</span>{' '}
                <Icon name="user" size={15} />
                <span className="opacity-9 ml-1 mr-2">
                  Người theo dõi: {storeData?.follower} |
                </span>
                <Icon name="chat" size={15} />{' '}
                <span className="opacity-9 ml-1">Phản hồi chat: 100%</span>
              </span>
            </div>
          </div>
          {/* <button className="button-follow" type="button">
            <Icon name="add" />
            Theo Dõi
          </button> */}
        </div>
        <div className="tab d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {/* <div className={`tab-item ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
              Cửa Hàng
            </div> */}
            <div
              className={`tab-item ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => setActiveTab(2)}
            >
              Tất cả sản phẩm
            </div>
            <div
              className={`tab-item ${activeTab === 3 ? 'active' : ''}`}
              onClick={() => setActiveTab(3)}
            >
              Hồ sơ cửa hàng
            </div>
          </div>
        </div>
      </div>
      <div className="content-page">
        {(activeTab === 1 || activeTab === 2) && (
          <div className="d-flex  mt-5 mb-5">
            <div className="section w-100">
              <div className="wrapSearchResult">
                {(listProducts ?? []).length > 0 ? (
                  <div className="d-flex flex-wrap">
                    <div className="wrap-4-product">
                      {(listProducts ?? []).map((item) => (
                        <ItemLuxuryProduct
                          product={item}
                          key={item.productId}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="wrapSearchResult__notfound d-flex flex-column align-items-center w-100 justify-content-center">
                    <Icon name="lookup" />
                    <p className="mt-3">
                      Không có sản phẩm phù hợp với nội dung tìm kiếm
                    </p>
                  </div>
                )}
              </div>

              {productsData.totalPaging > 1 && (
                <div className="d-flex justify-content-end">
                  <StyledReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handleChangePage}
                    pageRangeDisplayed={5}
                    pageCount={productsData.totalPaging}
                    previousLabel="<"
                    renderOnZeroPageCount={() => null}
                    forcePage={pageIndex - 1}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div className="profile">
            <div className="item-profile">
              <div className="first">Đã tham gia</div>
              <div className="bottom">
                <span>1</span>
                <span>năm</span>
              </div>
            </div>
            <div className="item-profile">
              <div className="first">Tỷ lệ huỷ</div>
              <div className="bottom">
                <span className="text-red">0%</span>
              </div>
            </div>
            <div className="item-profile">
              <div className="first">Tỷ lệ đổi trả</div>
              <div className="bottom">
                <span className="text-green">100%</span>
              </div>
            </div>
            <div className="item-profile">
              <div className="first">Giao hàng đúng hạn</div>
              <div className="bottom">
                <span className="text-green">100%</span>
              </div>
            </div>
            <div className="item-profile">
              <div className="first">Sản phẩm</div>
              <div className="bottom">
                <span className="text-green">{listProducts.length}</span>
              </div>
            </div>
            <div className="item-profile">
              <div className="first">Đánh giá</div>
              <div className="bottom">
                <span className="text-green">{storeData?.rating}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductContainerProps {
  storeData?: StoreEntity;
  productsData: BaseResponsePagination<HomePageProduct[]>;
}
const mapStateToProps = (state: any, ownProps: ProductContainerProps) => ({
  ...ownProps,
});
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StoreContainer);
