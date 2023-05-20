import React, { useState } from 'react';
import { formatDate } from 'utils/convertDate';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';
import NofiticationEvaluate from './NotificationEvaluate';

type ItemCommentProps = {
  image: string;
  name: string;
  orderId: string;
  productId: string;
  orderCode: string;
  createdDate: string;
};

const ItemComment: React.FC<ItemCommentProps> = ({
  image,
  name,
  orderId,
  productId,
  orderCode,
  createdDate,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [isPopup, setIsPopup] = useState(false);

  return (
    <>
      <div className="comment">
        <p className="comment-image">
          <img src={image ?? '/img/under_comment.png'} alt={name} />
        </p>
        <div className="comment-content">
          <p className="comment-title">
            {t.packages} <span>{name}</span> {t.ofOrder}
            <span> {orderCode}</span> {t.shippedSuccess}.
          </p>

          <p className="comment-time">{formatDate(createdDate)}</p>
        </div>
        <div className="comment-button" onClick={() => setIsPopup(true)}>
          {t.review}
        </div>
      </div>
      {isPopup && (
        <NofiticationEvaluate
          name={name}
          image={image}
          createdDate={createdDate}
          orderId={orderId}
          productId={productId}
          handleClosePopup={() => setIsPopup(false)}
        />
      )}
    </>
  );
};

export default ItemComment;
