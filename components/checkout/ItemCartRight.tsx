import React from 'react';
import { formatVietnamDong } from 'utils';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

interface ItemCartRightProps {
  image: string;
  name: string;
  price: number;
  qty: number;
}

const ItemCartRight: React.FC<ItemCartRightProps> = ({
  image,
  name,
  price,
  qty,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <div className="d-flex align-items-center item-cart-right">
      <div className="img d-flex align-items-center ">
        <img src={image} alt="store" />
      </div>
      <div>
        <div className="headline-03 text-gray6 mbt-3">{name}</div>
        <div className="heading-04 mbt-3">{formatVietnamDong(price)}</div>
        <div>
          {t.quantity}: x{qty}
        </div>
      </div>
    </div>
  );
};

export default ItemCartRight;
