/* eslint-disable react/button-has-type */
import en from 'locales/en';
import vn from 'locales/vn';
import { pickBy } from 'lodash';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { getSuggestionServices, SuggestResponse } from 'services/products';
import useKeyPress from 'utils/keypress';
import useOnClickOutside from 'utils/useClickOutSide';
import { useDebounce } from 'utils/useDebounc';

const pageSize = 24;
const pageIndex = 1;

const SearchBox: React.FC<PropsFromRedux> = (props) => {
  const [keyword, setKeyword] = useState('');
  const query = useSelector((state: RootState) => state.search.query);
  const popupLogin = useSelector(
    (state: RootState) => state.user.stateLoginPopup,
  );
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const [results, setResults] = useState<SuggestResponse>({
    titles: [],
    stores: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(keyword, 300);
  const [showSuggest, setShowSuggest] = useState(false);
  const wrap = useRef<HTMLInputElement>(null);
  useOnClickOutside(wrap, () => setShowSuggest(false));
  const onEnter = useKeyPress('Enter');

  const handleSubmit = () => {
    const cleanedSearchQuery = qs.stringify(
      pickBy(
        { ...query, keyword, pageSize, pageIndex },
        (value) => value !== '',
      ),
    );
    router.push(`/search?${cleanedSearchQuery}`);
  };

  useEffect(() => {
    if (query.keyword !== keyword) {
      setKeyword(query.keyword ?? '');
    }
  }, [query.keyword]);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        getSuggestionServices({ keywords: debouncedSearchTerm })
          .then((results) => {
            setIsSearching(false);
            setResults(results.data.data);
          })
          .catch(() => setIsSearching(false));
      } else {
        setResults({ titles: [], stores: [] });
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );

  const handleClickTitle = (text: string) => {
    const cleanedSearchQuery = qs.stringify(
      pickBy(
        { ...query, keyword: text, pageSize, pageIndex },
        (value) => value !== '',
      ),
    );
    router.push(`/search?${cleanedSearchQuery}`);
  };

  useEffect(() => {
    if (onEnter && keyword && !popupLogin) {
      handleSubmit();
    }
  }, [onEnter, handleSubmit]);

  return (
    <div className="search-wrap" ref={wrap} id="search-box">
      <button
        className={`search ${isSearching ? 'active' : ''}`}
        onClick={handleSubmit}
      >
        <img src="/img/Searching.png" alt="search" />
      </button>
      <input
        type="text"
        name="keyword"
        placeholder={t.headerSearchPlaceHolder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onClick={() => setShowSuggest(true)}
        autoComplete="off"
      />

      {showSuggest && (
        <div className="suggest-box" onClick={() => setShowSuggest(false)}>
          {results.stores.map((item) => (
            <div
              className="item item-store d-flex align-item-center"
              onClick={() => router.push(`/store/${item.storeId}`)}
            >
              <div className="avatar mr-2">
                <img src={item.logo ?? '/svg/sony-black.svg'} alt="avartar" />
              </div>
              <div>{item.storeName}</div>
            </div>
          ))}
          {results.titles.map((item) => (
            <div className="item" onClick={() => handleClickTitle(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export interface SearchBoxProps {}
const mapStateToProps = (state: RootState, ownProps: SearchBoxProps) => ({
  ...ownProps,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SearchBox);
