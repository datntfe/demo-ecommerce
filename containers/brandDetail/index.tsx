import ScrollButton from 'components/common/BacktoTop';
import Breadcrumb from 'components/common/breadcrumb';
import ItemLuxuryProduct from 'components/ListItem/ItemLuxury';
import { BrandBanner, HomePageProduct } from 'interfaces/response/home';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';

interface BrandDetailProps {
  brand: BrandBanner;
  products: HomePageProduct[];
}

const BrandDetail: React.FC<BrandDetailProps> = ({ brand, products }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const breadcum = [
    { name: 'Shopdi', path: '/' },
    { name: t.brandName, path: '/brands' },
    { name: brand.brandName.toLocaleUpperCase(), path: '' },
  ];
  return (
    <div className="container mt-32 mb-32" id="brands">
      <div className="mb-32">
        <Breadcrumb items={breadcum} />
      </div>

      <div
        className="d-flex align-items-center flex-column justify-content-center w-100 item-brand mb-32"
        style={{ backgroundImage: `url(${brand.brandImage})` }}
      >
        <h1 className="title">{brand.brandName}</h1>
      </div>
      <div className="mb-5">
        <div className="wrap-4-product">
          {(products ?? []).map((item) => (
            <ItemLuxuryProduct product={item} key={item.productId} />
          ))}
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};

export default BrandDetail;
