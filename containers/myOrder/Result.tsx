import Icon from 'components/common/Icon';
import ItemLuxuryProduct from 'components/ListItem/ItemLuxury';
import SlideComponent from 'components/share/SlideComponent';
import { HomePageProduct } from 'interfaces/response/home';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getSystemStatus } from 'redux/action/user';

interface ResultProps {
  recommendList: HomePageProduct[];
}

const Result: React.FC<ResultProps> = ({ recommendList }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const status = router.query.Status;
  const { error_code } = router.query;
  const orderId = router.query.ServiceOrderId;
  const textAreaRef = useRef<HTMLSpanElement>(null);
  const handleCopied = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.innerText;
      navigator.clipboard.writeText(text);
    }
  };
  useEffect(() => {
    dispatch(getSystemStatus());
  }, []);

  return (
    <div className="container">
      <div
        className="d-flex align-items-center flex-column py-5 justify-content-center"
        style={{ minHeight: '500px' }}
      >
        <div className="font-bold font-size20 mt-5 mb-5 text-uppercase">
          {t.placeOrder}{' '}
          {status === '00' || error_code === '00' ? t.success : t.failed}!
        </div>

        {status === '00' || error_code === '00' ? (
          <img src="/svg/alert-success.svg" alt="icon" />
        ) : (
          <img src="/svg/alert-red.svg" alt="icon" />
        )}
        <div className="d-flex align-items-center mt-5">
          <div className="mr-3">{t.orderCode}:</div>
          <button
            type="button"
            onClick={handleCopied}
            className="px-3 button button-outline"
          >
            <span className="mr-3" ref={textAreaRef}>
              {orderId}
            </span>
            <Icon name="copy" />
          </button>
        </div>

        <div className="mt-4">
          <button
            className="button button-primary py-3 px-5"
            type="button"
            onClick={() => router.push(`/my-order/${orderId}`)}
          >
            {t.followOrder}
          </button>
        </div>
        {/* <div className="styledFrame">
          <span className="font-size12">
            Thông tin chi tiết về đơn hàng đã được gửi đến địa chỉ mail&nbsp;
            <span className="text-green">nh21257610@gmail.com</span>.<br /> Nếu không tìm thấy vui lòng kiểm tra trong
            hộp thư Spam.
          </span>
        </div> */}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="font-size22">{t.suggestForYou}</div>
      </div>
      <div className="mb-5">
        {recommendList.length >= 4 && (
          <div className="wrap-4-product">
            {(recommendList ?? []).map((item) => (
              <ItemLuxuryProduct product={item} key={item.productId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
