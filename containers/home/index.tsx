/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import ConfirmPopup from 'components/common/AlertPopup/ConfirmPopup';
import FixedWallet from 'components/common/FixedWallet';
import Icon from 'components/common/Icon';
import ItemLuxuryProduct from 'components/ListItem/ItemLuxury';
import MenuList from 'components/menu/MenuList';
import SlideComponent from 'components/share/SlideComponent';
import { useFormik } from 'formik';
import { CategoriesData } from 'interfaces/response/categories';
import { IResponseHomePageLuxury } from 'interfaces/response/home';
import { LastedBidding } from 'interfaces/types/lastedBidding';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import Countdown from 'react-countdown';
import { connect, ConnectedProps } from 'react-redux';
import { setBiddingProcess } from 'redux/action/home';
import { RootState } from 'redux/reducer';
import * as yup from 'yup';
import Image from 'next/image';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('sai định dạng email')
    .max(255)
    .required('Bạn chưa nhập email'),
});

const Completionist = () => <div className="ml-3">Ended!</div>;

interface rendererProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }: rendererProps) => {
  if (completed) {
    return <Completionist />;
  }
  return (
    <div className="limit-time-product headline-03">
      <div>{hours <= 9 ? `0${hours}` : hours}</div>&nbsp;:&nbsp;
      <div>{minutes <= 9 ? `0${minutes}` : minutes}</div>
      &nbsp;:&nbsp;
      <div>{seconds <= 9 ? `0${seconds}` : seconds}</div>
    </div>
  );
};

const HomeContainer: React.FC<PropsFromRedux> = (props) => {
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const {
    homeData,
    biddingLasted,
    isAuthentied,
    setBiddingProcessAction,
    userProfile,
    category,
  } = props;
  const {
    mainAdvMedia,
    limitedProducts,
    middleAdvMedia,
    outstandingBrand,
    suggestProducts,
    hotDeal,
  } = homeData;
  const [mount, setMount] = useState(false);
  const [alertBeta, setAlertBeta] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const formikProfile = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const [showFixedLabel, setShowFixedLabel] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 520) {
        setShowFixedLabel(true);
      } else {
        setShowFixedLabel(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMount(true);
    if (isAuthentied) {
      // getBiddingProcessing()
      //   .then((result) => {
      //     console.log('result', result);
      //     try {
      //       if (result.data.data.inProcess.length > 0) {
      //         setBiddingProcessAction(result.data.data);
      //       }
      //     } catch (ex) {
      //       console.log(`Can't get process bidding`);
      //     }
      //   })
      //   .catch((er) => {
      //     localStorage.removeItem('persist:root');
      //   });
    }
  }, []);

  if (!mount) {
    // return <span>No data</span>;
    return null;
  }

  const handleClickPlay = () => {
    if (!refVideo.current) {
      return;
    }

    if (refVideo.current.paused) {
      setShowPlayButton(false);
      refVideo.current.play();
    } else {
      setShowPlayButton(true);
      refVideo.current.pause();
    }
  };
  console.log(limitedProducts?.items);
  console.log(hotDeal.items);

  return (
    <div className="home">
      <h1 className="hide">Shopdi - Săn cực phẩm, giá cực sốc</h1>
      {/* {alertBeta && (
        <ConfirmPopup onConfirm={() => setAlertBeta(false)}>
          <div className="text-center mb-3">
            <img src="/svg/alert-red.svg" alt="icon" />
          </div>
          <div className="text-center">
            Trang web này đang trong
            <br />
            quá trình thử nghiệm
          </div>
        </ConfirmPopup>
      )} */}
      {showFixedLabel && userProfile && (
        <FixedWallet point={userProfile.point} />
      )}
      <MenuList category={category} />
      <div
        className="banner-full-width"
        style={{
          backgroundImage: mainAdvMedia?.[0]?.thumbnail
            ? `url(${mainAdvMedia?.[0]?.thumbnail})`
            : '#F8F8F8',
        }}
      />
      <div className="container">
        <div className="d-flex justify-content-center video-home">
          <div className="main-4-image w-100 relative">
            <div className="button-play" onClick={handleClickPlay}>
              {showPlayButton && <img src="/svg/play-button.svg" alt="play" />}
            </div>
            <video
              autoPlay={false}
              width="100%"
              ref={refVideo}
              poster="/img/poster-video.png"
            >
              <source src={mainAdvMedia?.[1]?.url} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="mb-40">
          <div className="d-flex justify-content-between align-items-center mb-24">
            <div className="d-flex align-items-center">
              <h2 className="title-section display-02">{t.limitProduct}</h2>
              <div className="">
                <Countdown
                  date={limitedProducts?.endingTime}
                  renderer={renderer}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Link href="/limit-product">
                <a className="d-flex align-items-center hover-opacity">
                  <p className="right mt-1 text-uppercase text-gray headline-03">
                    {t.viewAll}
                  </p>
                  {/* <Icon name="breadcrumb" color="#374756" /> */}
                </a>
              </Link>
            </div>
          </div>
          {/* <SlideComponent
            setting={{
              infinite: true,
              autoplay: false,
              speed: 5000,
            }}
            slidesToShow={4}
            items={(limitedProducts?.items ?? []).map((item) => (
              <ItemLuxuryProduct product={item} key={item?.productId} />
            ))}
          /> */}
          <div
            // style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)' }}
            className="wrap-4-product"
          >
            {(limitedProducts?.items ?? []).map((item, index) => {
              if (index > 3) {
                return null;
              }
              return <ItemLuxuryProduct product={item} key={item.productId} />;
            })}
          </div>
        </div>

        <div className="d-flex justify-content-center">
          {/* <Link href="/hot-deal">
            <a> */}
          <Image
            src={hotDeal?.banner?.thumbnail}
            alt="banner-home"
            className="hover"
            width={1274}
            height={637}
          />
          {/* </a>
          </Link> */}
        </div>
        <div className="hot-deal-home">
          <div className="d-flex justify-content-between align-items-center mb-24">
            <div className="d-flex">
              <h2 className="title-section display-02">HOT DEAL</h2>
            </div>
            <div className="d-flex align-items-center">
              <Link href="/hot-deal">
                <a className="d-flex align-items-center hover-opacity">
                  <p className="right mt-1 text-uppercase text-gray headline-03">
                    {t.viewAll}
                  </p>
                  {/* <Icon name="breadcrumb" color="#374756" /> */}
                </a>
              </Link>
            </div>
          </div>
          {/* <SlideComponent
            setting={{
              infinite: true,
              autoplay: false,
              speed: 5000,
            }}
            slidesToShow={4}
            items={(hotDeal?.items ?? []).map((item) => (
              <ItemLuxuryProduct product={item} key={item.productId} />
            ))}
          /> */}
          <div
            // style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)' }}
            className="wrap-4-product"
          >
            {(hotDeal?.items ?? []).map((item, index) => {
              if (index > 3) {
                return null;
              }
              return <ItemLuxuryProduct product={item} key={item.productId} />;
            })}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center w-100 mb-64">
        <div
          className="banner-full-width"
          style={{
            backgroundImage: `url(${outstandingBrand?.banner?.thumbnail})`,
          }}
        />
      </div>
      <div className="mb-40">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-24">
            <h2 className="title-section display-02">{t.hotBrand}</h2>
            <div className="d-flex align-items-center">
              <Link href="/brands">
                <a className="d-flex align-items-center hover-opacity">
                  <p className="right mt-1 text-uppercase text-gray headline-03">
                    {t.viewAll}
                  </p>
                  {/* <Icon name="breadcrumb" color="#374756" /> */}
                </a>
              </Link>
            </div>
          </div>
          <div className="brand-items d-flex flex-wrap">
            {(outstandingBrand?.items ?? []).map((item) => (
              <div className="brand-item cursor-pointer" key={item?.brandId}>
                <Link href={`/brands/${item?.brandId}`}>
                  <a className="hover-color">
                    <Image
                      src={item?.brandImage}
                      alt="banner-home"
                      className="hover"
                      layout="responsive"
                      width={480}
                      height={480}
                    />
                    <div className="text-center brand-home-title heading-3 text-uppercase">
                      {item?.brandName}
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-64">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-24">
            <h2 className="title-section display-02">{t.productToday}</h2>
            <div className="d-flex align-items-center">
              <Link href="/suggestion">
                <a className="d-flex align-items-center hover-opacity">
                  <p className="right mt-1 text-uppercase text-gray headline-03">
                    {t.viewAll}
                  </p>
                  {/* <Icon name="breadcrumb" color="#374756" /> */}
                </a>
              </Link>
            </div>
          </div>
          <div
            // style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)' }}
            className="wrap-4-product"
          >
            {(suggestProducts ?? []).map((item) => (
              <ItemLuxuryProduct product={item} key={item.productId} />
            ))}
          </div>

          {/* <div className="d-flex justify-content-center box-claim-email">
          <div>
            <div className="title">THU THẬP THÔNG TIN EMAIL</div>
            <div>
              Thưởng thức nội dung độc quyền trên ứng dụng SHOPDI, bao gồm các
              <br /> chương trình khuyến mãi và cập nhật mới nhất. thông tin về ứng dụng
            </div>
            <div
              className="claim-email"
              style={{
                borderColor: formikProfile.touched.email && Boolean(formikProfile.errors.email) ? 'red' : '#000',
              }}
            >
              <input placeholder="Nhập email của bạn" onChange={formikProfile.handleChange} type="email" name="email" />
              <div className="email-icon cursor-pointer" onClick={() => formikProfile.handleSubmit()}>
                <Icon name="email" />
              </div>
            </div>
            {formikProfile.touched.email && Boolean(formikProfile.errors.email) && (
              <div className="text-red mt-2">{formikProfile.errors.email}</div>
            )}
          </div>
          <div className="qr-code">
            <QRCodeSVG value="https://m.shopdi.io" />
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export interface HomePageProps {
  data?: any;
  homeData: IResponseHomePageLuxury;
  biddingLasted: Array<LastedBidding>;
  category: CategoriesData[];
}
const mapStateToProps = (state: RootState, ownProps: HomePageProps) =>
  // orderBy
  ({
    ...ownProps,
    isAuthentied: state.user.profile !== undefined,
    userProfile: state.user.profile,
  });
const connector = connect(mapStateToProps, {
  setBiddingProcessAction: setBiddingProcess,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(HomeContainer);
