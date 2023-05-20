import React from 'react';
import ButtonComponent from 'components/marketings/components/Button';
import Countdown from 'react-countdown';
import { useMediaQuery } from 'react-responsive';
import CategoryComponent from '../../components/marketings/components/Category';
import ImageTitle from '../../components/marketings/components/ImageTitle';
import Tab from '../../components/marketings/components/Tabs';
import Carousels from '../../components/marketings/components/Carousels';
import ProductItem from '../../components/marketings/components/Products';

const MarketingDemo = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const arrayCategory = [
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
    {
      className: 'default',
      name: 'Phí ship siêu rẻ',
      link: '/',
      showName: true,
      pictureUrl:
        'https://salt.tikicdn.com/cache/200x200/ts/brickv2og/5d/54/7a/6e78ae1b9bfd322dd68e6e8dad7a5642.png.webp',
    },
  ];
  const renderProducts = () => (
    <>
      <Carousels
        className="Carousel-component mb-5"
        slidesToShow={4}
        slidesToScroll={4}
        dots={false}
        responsive={[
          {
            breakpoint: 767,
            settings: {
              dots: false,
              nav: null,
              slidesToShow: 2.5,
              slidesToScroll: 2.5,
            },
          },
        ]}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProductItem key={item} />
        ))}
      </Carousels>
      <div className="load-more mb-5">
        <ButtonComponent
          title="Xem thêm"
          className="radius-2"
          classNameOut="default"
        />
      </div>
    </>
  );
  const dataListTabs = [
    {
      label: <Countdown date={Date.now() + 100000000} />, // tên tab = countdown
      // label: 'Phúc Long', // tên tab = text
      value: 'UPCOMING',
      children: renderProducts(),
      labelCountDown: true, // tên tab = countdown
      // labelImage: 'https://salt.tikicdn.com/cache/w1240/ts/brickv2og/42/0e/6c/7e0c087297c21163fdaec8b0120c1772.png.webp' //Tên tab = hình ảnh
    },
    { label: 'Điện lạnh', value: 'ENDED', children: renderProducts() },
    { label: 'Tivi', value: 'JOINED', children: renderProducts() },
    { label: 'Nhà cửa đời sống', value: 'TELE', children: renderProducts() },
  ];

  return (
    <div className="wrapper">
      <div className="container">
        <section className="banner-full">
          <Carousels
            className="Carousel-component mb-5"
            slidesToShow={1}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 767,
                settings: {
                  dots: false,
                },
              },
            ]}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="Carousel-component-item center-scale">
                <a className="Carousel-component-avatar" href="#">
                  <img
                    src="https://salt.tikicdn.com/cache/w1208/ts/brickv2og/12/80/b5/c594e9f7f632d3ddeb1a75a969c8e5ec.png.webp"
                    alt=""
                  />
                </a>
              </div>
            ))}
          </Carousels>
        </section>
        {isMobile ? (
          <div className="category-mobile scroll-x no-wrap">
            {arrayCategory &&
              arrayCategory.map((item, key) => (
                <CategoryComponent
                  className={item.className}
                  name={item.name}
                  link={item.link}
                  pictureUrl={item.pictureUrl}
                  showName={item.showName}
                />
              ))}
          </div>
        ) : (
          ''
        )}
        <div className="row">
          {!isMobile ? (
            <div className="col-12">
              <div className="category-desktop">
                {arrayCategory &&
                  arrayCategory.map((item, key) => (
                    <CategoryComponent
                      className={item.className}
                      name={item.name}
                      link={item.link}
                      pictureUrl={item.pictureUrl}
                      showName={item.showName}
                    />
                  ))}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="col-12">
            <ImageTitle
              className="default"
              name="abc"
              pictureUrl="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/97/87/3b/9d58da014b508d254791bf74400902fd.png.webp"
            />
          </div>
          <div className="col-12">
            <Tab
              isMobile={isMobile}
              defaultActiveKey="UPCOMING"
              data={dataListTabs}
            />
          </div>
          <div className="col-12">
            <ImageTitle
              className="default"
              name="abc"
              pictureUrl="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/5b/15/58/5361890ba4e80dd4c9519f208c0b97a7.png.webp"
            />
            <Carousels
              className="Carousel-component mb-5 mt-5"
              variableWidth
              centerMode
              arrows={false}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={false}
              centerPadding="10px"
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    dots: false,
                    variableWidth: false,
                  },
                },
              ]}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="Carousel-component-item center-scale"
                >
                  <div className="Carousel-component-avatar">
                    <img
                      src="https://salt.tikicdn.com/cache/w940/ts/brickv2og/8f/49/d5/e6eab300ad6912ceb8835d7b8b6c0445.png.webp"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </Carousels>
          </div>
          <div className="col-12">
            <ImageTitle
              className="default"
              name="abc"
              pictureUrl="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/97/87/3b/9d58da014b508d254791bf74400902fd.png.webp"
            />
          </div>
          <div className="col-12">
            <div
              className={`product-list d-flex ${
                isMobile ? 'scroll-x' : 'flex-wrap'
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div className="col-6 col-lg-3">
                  <ProductItem key={item} />
                </div>
              ))}
            </div>
            <div className="load-more mb-5 mt-5">
              <ButtonComponent
                title="Xem thêm"
                className="radius-2"
                classNameOut="default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDemo;
