import React from 'react';
import { formatDate } from 'utils/convertDate';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

type NotificationItemProps = {
  image: string;
  description: string;
  orderId: string;
  createdDate: string;
  title: string;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  image,
  description,
  orderId,
  createdDate,
  title,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  return (
    <div className="comment">
      <p className="comment-image">
        <img src={image ?? '/img/under_comment.png'} alt={description} />
      </p>
      <div className="comment-content">
        <p className="uppercase font-size16 mb-2">{title}</p>
        <p className="comment-title">{description}</p>
        <p className="comment-time">{createdDate}</p>
      </div>
      <div
        className="comment-button"
        onClick={() => router.push(`/my-order/${orderId}`)}
      >
        {t.viewDetailOrder}
      </div>
    </div>
  );
};

export default NotificationItem;
