import qs from 'qs';

/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
export const SerializeQueryToUrl = function (obj: any) {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      if (obj[p] !== null) {
        if (obj[p] !== false) {
          if ((p === 'storeId' && obj[p] === -1) || (p === 'asc' && obj[p] === true)) {
          } else if (p === 'keywordsFull' || p === 'visibleOnly') {
            // REMOVE THIS SHJT
          } else {
            const value = encodeURIComponent(obj[p]);
            if (value.length > 0) {
              str.push(`${encodeURIComponent(p)}=${value}`);
            }
          }
        }
      }
    }
  return str.join('&');
};

export const getSearchQueryFromSearch = (search: any) => qs.parse(search, { ignoreQueryPrefix: true }) || {};
