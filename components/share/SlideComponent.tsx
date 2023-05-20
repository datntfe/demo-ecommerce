/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

const StyledSlide = styled.div`
  .slick-next {
    left: auto;
    z-index: 12;
    right: -10px;
  }

  .slick-prev {
    right: auto;
    z-index: 12;
    left: -10px;
  }
  .slick-dots {
    text-align: center;
    padding: 0;
    margin: 0;
    margin-top: 12px;

    li {
      display: inline-block;
      margin: 0 5px;
      line-height: 0;

      button {
        width: 10px;
        height: 10px;
        border: none;
        text-indent: 20px;
        overflow: hidden;
        border-radius: 50%;
        opacity: 0.5;
        padding: 0;
        background: rgba($color: $primary, $alpha: 0.7);
      }
    }

    .slick-active {
      button {
        opacity: 1;
      }
    }
  }

  .slick-arrow {
    border-radius: 100%;
    border: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-top: -16px;
    z-index: 1;
    cursor: pointer;
    font-size: 0;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: center center;
    &:hover {
      opacity: 0.8;
    }

    svg {
      user-select: none;
      cursor: none;
    }
    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
      }
    }
  }
`;
export interface PropsSlickCus {
  items: Array<any>;
  cdnHost?: string;
  rows?: number;
  slidesToShow?: number;
  setting: Settings;
}

const CustomArrowIcon = (props: any) => {
  const { className, style, onClick, type } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      {type === 'next' ? (
        <img src="/svg/next-slider.svg" />
      ) : (
        <img src="/svg/pre-slider.svg" />
      )}
    </div>
  );
};
const SlideComponent = ({
  items,
  rows,
  setting,
  slidesToShow = 5,
}: PropsSlickCus) => {
  const sliderRef = React.useRef<Slider>(null);

  const settings: Settings = {
    ...setting,
    className: 'item-child',
    slidesToShow,
    slidesToScroll: slidesToShow,
    speed: 900,
    rows: rows || 1,
    slidesPerRow: 1,
    rtl: false,

    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       // dots: true
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //       // dots: true
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       // dots: true
    //     },
    //   },
    // ],
  };
  // if (items?.length < slidesToShow * 2) {
  //   settings.rows = 1;
  // }

  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
  }, [items]);

  return (
    <StyledSlide>
      <Slider
        nextArrow={<CustomArrowIcon type="next" />}
        prevArrow={<CustomArrowIcon type="pre" />}
        ref={sliderRef}
        {...settings}
      >
        {items?.map((design: any, index: number) => (
          <div key={index} className="wrap">
            {design}
          </div>
        ))}
      </Slider>
    </StyledSlide>
  );
};

export default SlideComponent;
