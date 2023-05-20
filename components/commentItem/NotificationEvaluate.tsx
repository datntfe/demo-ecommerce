import React, { useState } from 'react';
import { Rate, Radio, RadioChangeEvent, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import { commentSuccess } from 'redux/action/user';
import { submitReviewOrder } from 'services/order';
import { IResquestReviewOrder } from 'interfaces/response/order';
import Icon from 'components/common/Icon';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import axios from 'axios';
import { formatDate } from 'utils/convertDate';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

type NotificationEvaluateProps = {
  image: string;
  name: string;
  orderId: string;
  productId: string;
  createdDate: string;
  handleClosePopup: () => void;
};

const descRate = [
  'ĐÁNH GIÁ',
  'CỰC KÌ KHÔNG HÀI LÒNG',
  'KHÔNG HÀI LÒNG',
  'BÌNH THƯỜNG',
  'HÀI LÒNG',
  'CỰC KÌ HÀI LÒNG',
];

const NotificationEvaluate: React.FC<NotificationEvaluateProps> = ({
  name,
  image,
  createdDate,
  orderId,
  productId,
  handleClosePopup,
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [rate, setRate] = useState(0);
  const [textareaValue, setTextareaValue] = useState('');
  const [isFocusComment, setIsFocusComment] = useState(false);
  const [isFocusRate, setIsFocusRate] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [statusButtonSubmit, setStatusButtonSubmit] = useState(t.sendReview);
  const dispatch = useDispatch();

  const options = [
    { label: t.verygood, value: t.verygood },
    { label: t.good, value: t.good },
    {
      label: t.shippedQuickly,
      value: t.shippedQuickly,
    },
    {
      label: t.goodBid,
      value: t.goodBid,
    },
    {
      label: t.bad,
      value: t.bad,
    },
  ];

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    setIsFocusComment(true);
  };
  const onChangeFastComment = (e: RadioChangeEvent) => {
    setTextareaValue(e.target.value);
    setIsFocusComment(true);
  };

  const handleChangeUpload: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const handlePostReviews = async () => {
    if (rate && textareaValue.length > 4) {
      setError('');
      try {
        let fileUploadPost: any = [];
        setIsLoading(true);
        if (fileList.length > 0) {
          const formData = new FormData();

          Array.from(fileList).forEach((element) => {
            formData.append('files', element.originFileObj as any);
            formData.append('slug', `${element.name}-${orderId}`);
          });
          const result = await axios.post(
            'https://fs.shopdi.io/api/v1/images/import',
            formData,
            {
              headers: {
                'Content-type': 'multipart/form-data',
              },
            },
          );

          fileUploadPost = result.data?.map((img: any) => ({
            files: img.w500,
            type: 1,
          }));
        }

        setStatusButtonSubmit(t.inprogress);
        const data = await submitReviewOrder({
          orderId,
          productId,
          files: fileUploadPost,
          content: textareaValue,
          star: rate,
        } as IResquestReviewOrder);
        if (data.status) {
          setStatusButtonSubmit(t.sendReview);
          setIsSubmited(true);
        }
        setIsLoading(false);
      } catch (error) {
        setError(t.hasError);
        setIsLoading(false);
      }
    }

    return false;
  };
  return (
    <div className="noti-eval">
      <div className="noti-bg" />
      {!isSubmited ? (
        <div className="noti-content">
          <div className="noti-xmark" onClick={handleClosePopup}>
            <img src="/svg/xmark.svg" alt="" />
          </div>
          <div className="d-flex align-items-center">
            <p className="noti-image">
              <img
                src={image ?? '/img/under_product_evaluate.png'}
                alt={name}
              />
            </p>
            <div>
              <p className="noti-product-name">{name}</p>
              <p className="noti-time">{formatDate(createdDate)}</p>
            </div>
          </div>
          <p className="noti-line" />
          <div className="noti-rate">
            <p className="noti-rate-title">{descRate[rate]}</p>
            <div className="text-center">
              <Rate
                value={rate}
                onChange={setRate}
                onHoverChange={() => setIsFocusRate(true)}
                allowClear
              />
            </div>
            {isFocusRate && rate < 1 && (
              <p className="noti-error-rate">{t.reviewBefore}</p>
            )}
          </div>
          <div className="noti-comment">
            <div className="noti-textarea">
              <TextArea
                showCount
                rows={6}
                value={textareaValue}
                maxLength={120}
                placeholder={t.shareInfo}
                onChange={onChangeComment}
              />
              {isFocusComment && textareaValue.length < 5 && (
                <p className="noti-error-minlenght">{t.hintReviewPage}</p>
              )}
            </div>
            <Radio.Group
              options={options}
              onChange={onChangeFastComment}
              defaultValue={[]}
            />
          </div>
          <div className="noti-upload">
            <Upload
              id="upload"
              name="upload"
              fileList={fileList}
              listType="picture-card"
              multiple
              onChange={handleChangeUpload}
              showUploadList={{
                showPreviewIcon: false,
              }}
            >
              {t.addPhoto}
            </Upload>
          </div>
          {error && <div className="text-red mb-2 text-center">{error}</div>}
          <div className="noti-button">
            <p>
              <label htmlFor="upload">
                <img src="/svg/camera.svg" alt="" />
                {t.addPhoto}
              </label>
            </p>
            <p
              onClick={handlePostReviews}
              className={`${
                rate > 0 && textareaValue.length > 4 && !isLoading
                  ? 'isSuccessSubmit'
                  : ''
              }`}
            >
              {statusButtonSubmit}
            </p>
          </div>
        </div>
      ) : (
        <div className="noti-content">
          <div className="text-center">
            <div className="noti-thanks-icon">
              <Icon name="comment-empty" />
            </div>
            <p className="noti-thanks-title">{t.tksForReview} </p>
            <p className="noti-thanks-desc">{t.reviewInfo}</p>
            <div
              className="noti-thanks-button"
              onClick={() => {
                handleClosePopup();
                dispatch(commentSuccess(orderId));
              }}
            >
              ok
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationEvaluate;
