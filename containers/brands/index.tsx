import Breadcrumb from 'components/common/breadcrumb';
import { BrandBanner } from 'interfaces/response/home';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface BrandsProps {
  brands: BrandBanner[];
}

const Brands: React.FC<BrandsProps> = ({ brands }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const breadcum = [
    { name: 'Shopdi', path: '/' },
    { name: t.brandName, path: '' },
  ];

  return (
    <div className="container mt-32 mb-40" id="brands">
      <div className="mb-32">
        <Breadcrumb items={breadcum} />
      </div>
      <h1 className="d-none">shopdi branding</h1>
      {brands.map((item) => (
        <div
          className="d-flex align-items-center flex-column justify-content-center w-100 item-brand mb-24"
          style={{ backgroundImage: `url(${item.brandImage})` }}
        >
          <h2 className="title">{item.brandName}</h2>
          <Link href={`/brands/${item.brandId}`}>
            <a className="button-a">{t.detail}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Brands;
