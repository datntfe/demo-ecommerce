import Icon from 'components/common/Icon';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';

interface StoreProps {
  banner: string;
  storeId: string;
  storeCode: string;
  storeName: string;
  logo: string;
  totalProduct: number;
  follower: number;
  rating: number;
  response: number;
}

const Store: React.FC<StoreProps> = ({
  banner,
  storeId,
  storeCode,
  storeName,
  logo,
  totalProduct,
  follower,
  rating,
  response,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <div
      className="store-product-detail" /* style={{ backgroundImage: `url(${banner})` }} */
    >
      <div
        className="d-flex align-items-center cursor-pointer"
        onClick={() => router.push(`/store/${storeId}`)}
      >
        <div className="avatar mr-3">
          <img
            src={logo !== '' ? logo : '/svg/sony-black.svg'}
            alt={storeName}
          />
        </div>
        <div className="right">
          <h3 className="first headline-03">{storeName}</h3>
          <div className="second">{storeCode}</div>
          <div className="second small-caption">
            <span>{follower}</span> {t.personFollow} |&nbsp;
            <span>{rating}</span> {t.review}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center hide-mobile">
        <div className="item">
          <div className="text-blue botton-label">{totalProduct}</div>
          <div className="heading-05">{t.product}</div>
        </div>
        <div className="item">
          <div className="text-blue botton-label">{response}%</div>
          <div className="heading-05">{t.rateFeedBack}</div>
        </div>
        <div className="item mr-4">
          <div className="text-blue botton-label">{t.inhour}</div>
          <div className="heading-05">{t.feedback}</div>
        </div>
        <div
          onClick={() =>
            router.push(`/store/${storeId}/?pageIndex=1&pageSize=30`)}
          className="cursor-pointer hover-opacity"
        >
          <Icon name="arrow-next" />
        </div>
      </div>
    </div>
  );
};

export default Store;
