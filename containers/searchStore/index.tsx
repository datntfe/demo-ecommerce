/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
import Icon from 'components/common/Icon';
import Store from 'components/store';
import { StyledReactPaginate } from 'containers/searchProduct';
import { BaseResponsePagination } from 'interfaces/response/common';
import { StoreEntity } from 'interfaces/response/store';
import { pickBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { clearQuery } from 'redux/action/search';
import { RootState } from 'redux/reducer';




const SearchProductContainer: React.FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.search.query.keyword);
  const { query, response } = props;
  const router = useRouter();
  const storeList = response.data;
  const pageSize = response?.pageSize || 15;
  const pageIndex = response?.pageIndex || 1;

  const handleClear = () => {
    dispatch(clearQuery(false));
    const test = qs.stringify(
      pickBy({ keyword, pageSize, pageIndex: 1 }, (value) => value !== ''),
    );
    router.push(`/search?${test}`);
  };
  useEffect(() => {
    console.log('init page');
    return () => {
      dispatch(clearQuery(true));
    };
  }, []);

  const handleChangePage = (selectedItem: { selected: number }) => {
    // setCurrentPage(selectedItem.selected);
    const test = qs.stringify(
      pickBy(
        {
          keyword,
          pageSize,
          pageIndex: selectedItem.selected + 1,
        
        },
        (value) => value !== '',
      ),
    );
    router.push(`/search?${test}`);
  };


  return (
    <div className="search-page container ">
      <Link href="/"><a>Trang chủ&nbsp;</a></Link>/ <Link href="/search"><a>Tìm kiếm</a></Link> / <span>Tất cả cửa hàng</span>
      <div className='mt-5'>
        {query.keyword && (
          <div className="text-gray3 mt-4 mb-3">
            Shop liên quan đến:&nbsp; 
            <span>“{query.keyword}”</span>
          </div>
        )}
        <div className="section">

          <div className="wrapSearchResult">
            {(storeList ?? []).length > 0 ? 
              
                storeList.map((store) => (
                  <div className='mb-3'>
                    <Store logo={store.logo} banner={store.banner} storeCode={store.storeCode} storeId={store.storeId} storeName={store.storeName}             totalProduct={store.totalProduct}
            follower={store.follower}
            rating={store.rating}
            response={store.verified}/>
                  </div>
              ))

            
             : (
               <div className="wrapSearchResult__notfound d-flex flex-column align-items-center">
                 <Icon name="lookup" />
                 <p className="mt-3">
                   Không có sản phẩm phù hợp với nội dung tìm kiếm
                 </p>
                 <button
                  type="button"
                  className="px-3 mt-3 button border py-3 px-4"
                  onClick={handleClear}
                >
                   Xóa bộ lọc tìm kiếm
                 </button>
               </div>
            )}
          </div>
          {response.totalPaging > 1 && (
            <div className="d-flex justify-content-end">
              <StyledReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handleChangePage}
                pageRangeDisplayed={5}
                pageCount={response.totalPaging}
                previousLabel="<"
                renderOnZeroPageCount={() => null}
                forcePage={pageIndex - 1}
              />
            </div>
          )}
        </div>
      </div>
    </div>

  );
};
// export default SearchProductContainer;

interface SearchPageProps {
  response: BaseResponsePagination<StoreEntity[]>;
}
const mapStateToProps = (state: RootState, ownProps: SearchPageProps) => ({
  ...ownProps,
  query: state.search.query,
});
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SearchProductContainer);
