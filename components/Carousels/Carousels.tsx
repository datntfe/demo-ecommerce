import React, { useRef } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import Button from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TCarouselsProps } from './Carousels.types';

const Carousels: React.FC<TCarouselsProps> = ({
  dots = true,
  arrows = true,
  infinite = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  slidesPerRow = 1,
  responsive = [],
  autoplay,
  onDragging,
  arrowLeftIcon,
  arrowRightIcon,
  onChange,
  onInit,
  children,
}) => {
  const sliderRef = useRef<any>();

  const renderPrevArrow = (): React.ReactElement => (
    <Button
      size="small"
      className="Carousels-arrow prev"
      icon={
        <Icon
          name={arrowLeftIcon?.name || EIconName.AngleLeft}
          color={arrowLeftIcon?.color || EIconColor.WHITE}
        />
      }
    />
  );

  const renderNextArrow = (): React.ReactElement => (
    <Button
      size="small"
      className="Carousels-arrow next"
      icon={
        <Icon
          name={arrowRightIcon?.name || EIconName.AngleRight}
          color={arrowRightIcon?.color || EIconColor.WHITE}
        />
      }
    />
  );

  const settings = {
    speed: 500,
    dots,
    arrows,
    infinite,
    autoplay,
    slidesPerRow,
    autoplaySpeed: 5000,
    slidesToShow,
    slidesToScroll,
    responsive,
    nextArrow: renderNextArrow(),
    prevArrow: renderPrevArrow(),
    beforeChange: (currentSlide: number, nextSlide: number): void => {
      onChange?.(nextSlide);
      onDragging?.(true);
    },
    afterChange: (currentSlide: number): void => {
      // onChange?.(currentSlide);
      onDragging?.(false);
    },
  };
  return (
    <div className={classNames('Carousels')}>
      <Slider
        ref={sliderRef}
        {...settings}
        onInit={(): void => onInit?.(sliderRef)}
      >
        {children}
      </Slider>
    </div>
  );
};

export default Carousels;
