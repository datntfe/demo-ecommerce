import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

interface CartTabProps {
  active: number;
  isBuyNow?: boolean;
}

const CartTab: React.FC<CartTabProps> = ({ active, isBuyNow }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  const DATA = useMemo(
    () => [
      { title: t.cart, id: 1, link: '/cart' },
      { title: t.shipped, id: 2, link: '/shipping' },
      { title: t.checkout, id: 3, link: '/checkout' },
      { title: t.successOrder, id: 4 },
    ],
    [t, locale],
  );

  return (
    <div style={{ boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)' }}>
      <div className="container">
        <div className="tab-cart">
          {DATA.map((item) => (
            <div
              key={item.id}
              className={`tab-item ${active >= item.id ? 'active' : ''} ${
                active === item.id ? 'current' : ''
              }`}
            >
              <span className="number">{item.id}</span>
              {item.link && active > item.id ? (
                <Link href={`${item.link}`}>
                  <a className="name">{item.title}</a>
                </Link>
              ) : (
                <div className="name">{item.title}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CartTab;
