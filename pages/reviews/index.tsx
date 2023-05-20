import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import MyCoinCard from 'components/MyCoinCard';
import ProductHorizontal from 'components/ProductHorizontal';
import ReviewModal from 'containers/ReviewModal';

const ReviewsPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [reviewModalState, setReviewModalState] = useState<{
    visible: boolean;
  }>({ visible: false });

  const handleOpenReviewModal = (): void => {
    setReviewModalState({ visible: true });
  };

  const handleCloseReviewModal = (): void => {
    setReviewModalState({ visible: false });
  };

  return (
    <GuestLayout>
      <UserLayout>
        <div className="ReviewsPage">
          <MyCoinCard />

          <div className="ReviewsPage-title">ĐÁNH GIÁ CỦA TÔI</div>

          <div className="ReviewsPage-list">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <ProductHorizontal
                title={
                  <>
                    Kiện hàng <strong>AELGNLKSM</strong> của đơn hàng{' '}
                    <strong>LAKDNOAIA</strong> đã được giao thành công đến bạn.
                  </>
                }
                description="06/04/2022 04:13"
                buttonProps={{
                  title: 'Đánh giá',
                  onClick: handleOpenReviewModal,
                }}
              />
            ))}
          </div>
        </div>

        <ReviewModal {...reviewModalState} onClose={handleCloseReviewModal} />
      </UserLayout>
    </GuestLayout>
  );
};

export default ReviewsPage;
