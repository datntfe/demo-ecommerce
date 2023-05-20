import ScrollButton from 'components/common/BacktoTop';
import Breadcrumb from 'components/common/breadcrumb';
import ItemLuxuryProduct from 'components/ListItem/ItemLuxury';
import { BaseResponsePagination } from 'interfaces/response/common';
import { HomePageProduct } from 'interfaces/response/home';
import React, { useEffect, useState } from 'react';
import { getProductsByTypeServices } from 'services/products';

interface HotDealProps {
  products: BaseResponsePagination<HomePageProduct[]>;
}

const breadcum = [
  { name: 'Shopdi', path: '/' },
  { name: 'HOTDEAL', path: '' },
];
const HotDeal: React.FC<HotDealProps> = ({ products }) => {
  const [listData, setListData] =
    useState<BaseResponsePagination<HomePageProduct[]>>(products);
  const [listProduct, setListProduct] = useState<HomePageProduct[]>(
    products.data,
  );
  const [pageIndex, setPageIndex] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isCallData, setIsCallData] = useState(false);

  useEffect(() => {
    if (
      !isCallData &&
      pageIndex < listData.totalPaging &&
      pageIndex === listData.pageIndex
    ) {
      setPageIndex(pageIndex + 1);
      setLoadMore(false);
    } else {
      setLoadMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore]);

  const scrollFunc = () => {
    const currentScrollY = window.scrollY;
    if (
      window.innerHeight + currentScrollY >=
      document.body.offsetHeight - 400
    ) {
      setLoadMore(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollFunc);
    return () => window.removeEventListener('scroll', scrollFunc);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsCallData(true);
        const data = await getProductsByTypeServices(2, {
          pageIndex,
          pageSize: 20,
        });
        if (data.data.status && data.data.pageIndex !== listData.pageIndex) {
          setListData(data.data);
          setListProduct([...listProduct, ...data.data.data]);
        }
        setIsCallData(false);
      } catch (error) {
        setIsCallData(false);
        console.log(error);
      }
    };
    fetch();
  }, [pageIndex]);
  return (
    <div className="container mt-32 mb-32">
      <div className="mb-32">
        <Breadcrumb items={breadcum} />
      </div>
      <div className="wrap-4-product">
        {(listProduct ?? []).map((item) => (
          <ItemLuxuryProduct product={item} key={item.productId} />
        ))}
      </div>
      <div className="d-flex justify-content-center w-100">
        {isCallData && <img src="/svg/loading.svg" alt="loading" />}
      </div>
      <ScrollButton />
    </div>
  );
};

export default HotDeal;
