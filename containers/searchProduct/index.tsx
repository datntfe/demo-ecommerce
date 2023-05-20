/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
import { Rate, Slider, Checkbox } from "antd";
import Icon from "components/common/Icon";
import ItemLuxuryProduct from "components/ListItem/ItemLuxury";
import Store from "components/store";
import en from "locales/en";
import vn from "locales/vn";
import { pickBy } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "qs";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { clearQuery } from "redux/action/search";
import { RootState } from "redux/reducer";
import { returnArrayAttribute, SearchProductResponse } from "services/products";
import styled from "styled-components";
import Breadcrumb from 'components/common/breadcrumb';




function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  li {
    list-style: none;

    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li.selected {
    background: #eeeeee;
  }
`;

const STAR = [5, 4, 3, 2, 1];

const SearchProductContainer: React.FC<PropsFromRedux> = (props) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.search.query.keyword);
  const { query, response } = props;
  const store = props.response?.data?.stores;
  const [priceFrom, setPriceFrom] = useState("2000000");
  const [priceTo, setPriceTo] = useState("500000000");
  const [showFilter, setShowFilter] = useState(true);
  const attributes = returnArrayAttribute(query);
  const listProducts = response?.data ? response.data.products : [];
  const pageSize = response?.pageSize || 30;
  const pageIndex = response?.pageIndex || 1;
  const { rating } = query;
  const { categoryId: category } = query;
  const breadcum = [
    { name: t.homePage, path: '/' },
    { name: t.search },
  ];


  const categoryId = category?.substring((category?.lastIndexOf(".") ?? 0) + 1);

  const handleSearchPrice = () => {
    const test = qs.stringify(
      pickBy(
        {
          keyword,
          priceFrom,
          priceTo,
          rating,
          categoryId,
          pageIndex: 1,
          pageSize,
        },
        (value) => value !== ""
      )
    );
    router.push(`/search?${test}`);
  };

  useEffect(() => {
    setPriceFrom(query.priceFrom ?? "");
    setPriceTo(query.priceTo ?? "");
  }, [query]);

  const handleSearchByRate = (rate: string) => {
    // rating = rate;
    const test = qs.stringify(
      pickBy(
        {
          keyword,
          priceFrom,
          priceTo,
          categoryId,
          pageSize,
          pageIndex: 1,
          rating: rate === rating ? "" : rate,
        },
        (value) => value !== ""
      )
    );

    router.push(`/search?${test}`);
  };

  const handleSearchCategory = (name: string, category: string) => {
    const test = qs.stringify(
      pickBy(
        {
          keyword,
          priceFrom,
          priceTo,
          rating,
          pageSize,
          pageIndex: 1,
          categoryId: category === categoryId ? "" : `${name}.${category}`,
        },
        (value) => value !== ""
      )
    );

    router.push(`/search?${test}`);
  };

  const handleClear = () => {
    dispatch(clearQuery(false));
    const test = qs.stringify(
      pickBy({ keyword, pageSize, pageIndex: 1 }, (value) => value !== "")
    );
    router.push(`/search?${test}`);
  };
  useEffect(() => () => {
      dispatch(clearQuery(true));
    }, []);

  const handleChangePage = (selectedItem: { selected: number }) => {
    // setCurrentPage(selectedItem.selected);
    const test = qs.stringify(
      pickBy(
        {
          keyword,
          priceFrom,
          priceTo,
          categoryId,
          pageSize,
          pageIndex: selectedItem.selected + 1,
          rating,
        },
        (value) => value !== ""
      )
    );
    router.push(`/search?${test}`);
  };

  const handleCheckAttribute = (
    isChecked: boolean,
    attributeCode: string,
    value: string
  ) => {
    // if(!isArray(attributes)){
    //   return;
    // }

    // (attributes ?? []).forEach(element => {

    // });

    const att = [
      {
        attributeCode,
        value: [value],
      },
    ];
    const test = qs.stringify(
      pickBy(
        {
          keyword,
          priceFrom,
          priceTo,
          categoryId,
          pageSize,
          pageIndex,
          rating,
          attributes: att,
        },
        (value) => value !== ""
      )
    );
    router.push(`/search?${test}`);
  };
  const changePrice = (e: any) => {
    setPriceFrom(e[0]);
    setPriceTo(e[1]);
  };
  const tipFormatter = (value?: number) =>
    value ? `${numberWithCommas(value)}đ` : "0đ";


  return (
    <div className="search-page container ">
      <div className="breadcum-search">
        <Breadcrumb items={breadcum} />

      </div>
      <div className="flex-column-mobile">
        {showFilter && (
          <div className="left-side">
            <div className="mbt-4">
              <span
                className="cursor-pointer headline-04 hover-color"
                onClick={() => setShowFilter(false)}
              >
                <u>Ẩn bộ lọc</u>
              </span>
            </div>
            {response?.data?.categories?.length > 0 &&             <div className="section-search">
              <h2 className="mb-3 headline-01">{t.category}</h2>
              {(response?.data?.categories ?? []).map((item) => (
                <div
                  className="font-size14 mb-2 cursor-pointer px-2 hover-color"
                  key={item.id}
                  onClick={() =>
                    handleSearchCategory(item.name, String(item.id))}
                  style={{
                    backgroundColor:
                      categoryId === String(item.id)
                        ? "rgba(0,0,0,0.3)"
                        : "transparent",
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>}

            <div className="section-search">
              <div className="mb-4 headline-01">{t.priceRanger}</div>
              <div className="mb-3">
               
                {/* <div className=" d-flex align-items-center justify-content-between">
                <div className="input-price">
                  <input
                    className="ranger"
                    placeholder="từ"
                    type="number"
                    onChange={(e) => setPriceFrom(e.target.value)}
                    value={priceFrom}
                  />
                  <div>đ</div>
                </div>
                <div>-</div>
                <div className="input-price">
                  <input
                    className="ranger"
                    placeholder="đến"
                    type="number"
                    onChange={(e) => setPriceTo(e.target.value)}
                    value={priceTo}
                  />
                  <div>đ</div>
                </div>
              </div> */}
                <div className="text-center headline-02 mbt-5">2.000.000đ - 500.000.000đ</div>
                <Slider
                  range
                  onChange={changePrice}
                  min={2000000}
                  max={500000000}
                  getTooltipPopupContainer={(triggerNode) => triggerNode}
                  tipFormatter={tipFormatter}
                  value={[Number(priceFrom), Number(priceTo)]}
                />
              </div>
              <div className="mb-4 mt-4">
                <button
                  type="button"
                  onClick={handleSearchPrice}
                  className="button button-outline size-s w-100"
                >
                  {t.apply}
                </button>
              </div>
            </div>

            <div className="section-search">
              <div className="mb-3 headline-01">Đánh giá</div>
              {STAR.map((item) => (
                <div className="d-flex mb-3">
                  <Checkbox
                    type="checkbox"
                    checked={rating === String(item)}
                    onChange={() => handleSearchByRate(String(item))}
                    id={String(item)}
                  />
                  <label className="ml-3 cursor-pointer" htmlFor={String(item)}>
                    Từ {item} sao
                  </label>
                </div>
              ))}
            </div>

            <button type="button" className="button button-outline size-s w-100" onClick={handleClear}>
              {t.deleteFilter}
            </button>
          </div>
        )}

        <div className={`right-side ${showFilter ? "show-filter" : "hide-filter"}`}>
          {store && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                {query.keyword && (
                  <div className="text-gray3">
                    {t.shopRelated}:&nbsp;
                    <span>“{query.keyword}”</span>
                  </div>
                )}
                <div className="d-flex align-items-center mr-4">
                  <Link
                    href={`/stores?keywords=${query.keyword}&pageIndex=1&pageSize=30`}
                  >
                    <a className="d-flex align-items-center">
                      <div className="mr-2">{t.viewAll}</div>
                      <Icon name="arrow-blue" color="#374756" />
                    </a>
                  </Link>
                </div>
              </div>
              <Store
                logo={store.logo}
                banner={store.banner}
                storeCode={store.storeCode}
                storeId={store.storeId}
                storeName={store.storeName}
                totalProduct={store.totalProduct}
                follower={store.follower}
                rating={store.rating}
                response={store.verified}
              />
            </div>
          )}
          <div className="d-flex">
            {!showFilter &&   <div className="mbt-5 show-filter">
              <span
                className="cursor-pointer headline-04 hover-color"
                onClick={() => setShowFilter(true)}
              >
                <u>Hiện bộ lọc</u>
              </span>
            </div>}

            {query.keyword ? (
              <h1 className="mbt-5 mb-4 body-01">
                <span className="text-gray6">{t.searchFor}:&nbsp;</span>
                <span className="font-bold">“{query.keyword}”</span>
              </h1>
          ) : (
            <div className="text-gray6 mbt-5 body-01">{t.allProduct}:</div>
          )}
          </div>
          <div className="section">
            <div className="wrapSearchResult">
              {(listProducts ?? []).length > 0 ? (
                <div className={showFilter ? "wrap-3-product" : "wrap-4-product"}>
                  {(listProducts ?? []).map((item) => (
                    <ItemLuxuryProduct product={item} key={item.productId} />
                  ))}
                </div>
              ) : (
                <div className="wrapSearchResult__notfound d-flex flex-column align-items-center">
                  <Icon name="lookup" />
                  <p className="mtt-5 text-gray6">{t.notFoundProduct}</p>
                  {/* <button
                    type="button"
                    className="px-5 mt-3 button button-primary size-s"
                    onClick={handleClear}
                  >
                    {t.deleteFilter}
                  </button> */}
                </div>
              )}
            </div>

            {response.totalPaging > 1 && (
              <div className="d-flex justify-content-end mt-5">
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
    </div>
  );
};
// export default SearchProductContainer;

interface SearchPageProps {
  response: SearchProductResponse;
}
const mapStateToProps = (state: RootState, ownProps: SearchPageProps) => ({
  ...ownProps,
  query: state.search.query,
});
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SearchProductContainer);
