import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import ButtonComponent from '../Button';

export const Carousels = ({
  className,
  centerMode = false,
  dots = true,
  arrows = true,
  infinite = true,
  variableWidth,
  slidesToShow = 1,
  slidesToScroll = 1,
  slidesPerRow = 1,
  responsive = [],
  autoplay,
  onDragging,
  slide,
  children,
  onInit,
  beforeChange,
  afterChange,
  centerPadding,
}: any) => {
  const renderPrevArrow = () => (
    <ButtonComponent size="small" className="Carousels-arrow prev" />
  );

  const renderNextArrow = () => (
    <ButtonComponent size="small" className="Carousels-arrow next" />
  );

  const settings = {
    speed: 500,
    dots,
    arrows,
    centerMode,
    infinite,
    autoplay,
    slidesPerRow,
    autoplaySpeed: 4000,
    slidesToShow,
    slidesToScroll,
    responsive,
    variableWidth,
    // nextArrow: renderNextArrow(),
    // prevArrow: renderPrevArrow(),
    beforeChange: (index: any) => {
      beforeChange?.(index);
      onDragging?.(true);
    },
    afterChange: (index: any) => {
      afterChange?.(index);
      onDragging?.(false);
    },
  };
  return (
    <div className={classNames('Carousels', className)}>
      <Slider {...settings} slide={slide} ref={(e) => onInit?.(e)}>
        {children}
      </Slider>
    </div>
  );
};

export default Carousels;
