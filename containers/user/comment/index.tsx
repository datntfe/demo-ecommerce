import ItemComment from 'components/commentItem/ItemComment';
import Icon from 'components/common/Icon';
import LeftSide from 'components/users/LeftSide';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentHistories } from 'redux/action/user';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 25px;
    .title {
      font-size: 20px;
      border-bottom: 1px solid #c2c2c2;
      padding: 10px 0;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
    }
  }

  .bg-gray4 {
    background: #eeeeee;
    border-radius: 4px;
  }
`;
const activeMenu = '5';
const PAGE_SIZE = 15;

const CommentContainer = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const commentList = useSelector(
    (state: RootState) => state.user.commentHistories,
  );
  const isLoadingHistory = useSelector(
    (state: RootState) => state.user.isLoadings.getHistory,
  );

  useEffect(() => {
    if (
      !isLoadingHistory &&
      commentList.pageIndex < commentList.totalPaging &&
      pageIndex === commentList.pageIndex
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
    dispatch(
      getCommentHistories({ pageSize: PAGE_SIZE, pageIndex, review: 1 }),
    );
  }, [dispatch, pageIndex]);

  return (
    <div className="container">
      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side">
          <div className="font-size16 font-bold title text-uppercase">
            {t.myReview}
          </div>
          {isLoadingHistory && pageIndex === 1 ? (
            <div className="d-flex justify-content-center">
              <img src="/svg/loading.svg" alt="" />
            </div>
          ) : (
            <>
              {}
              {commentList.data.length === 0 ? (
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ marginTop: '100px' }}
                >
                  <Icon name="comment-empty" />
                  <div className="body-01 mb-5 mt-3">{t.hintReviewPage}</div>

                  <Link href="/">
                    <button
                      type="button"
                      className="button button-primary size-l px-5"
                    >
                      <a>Tiếp tục mua sắm</a>
                    </button>
                  </Link>
                </div>
              ) : (
                commentList && (
                  <div className="container">
                    {commentList.data.map((item) => (
                      <ItemComment
                        image={item.image}
                        name={item.name}
                        orderId={item.orderId}
                        productId={item.productId}
                        orderCode={item.orderCode}
                        createdDate={item.createdDate}
                        key={item.orderCode}
                      />
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </StyledWrap>
    </div>
  );
};

export default CommentContainer;
