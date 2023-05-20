import { CategoriesData } from 'interfaces/response/categories';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

type MenuProps = {
  category: CategoriesData[];
};
const SLIDE_TO_SHOW = 7;

const MenuList: React.FC<MenuProps> = ({ category }) => {
  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countSlide, setCountSlide] = useState(0);
  const settingsSliderMenu = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: SLIDE_TO_SHOW,
    slidesToScroll: 7,
    variableWidth: true,
    arrows: false,
    afterChange: () => {
      setCurrentSlide(sliderRef.current?.innerSlider?.state.currentSlide);
    },
  };
  // Property 'innerSlider' does not exist on type 'Slider' --- NOT ERROR
  const handlePrevSlide = (e: React.MouseEvent) => {
    sliderRef?.current?.slickPrev();
  };
  const handleNextSlide = (e: React.MouseEvent) => {
    sliderRef?.current?.slickNext();
  };
  useEffect(() => {
    if (sliderRef?.current) {
      setCountSlide(sliderRef?.current?.innerSlider?.state.slideCount);
    }
  }, []);

  return (
    <div className="menu-list">
      <div className="container">
        {currentSlide > 0 && (
          <p className="slick-button-prev" onClick={handlePrevSlide}>
            <img src="/svg/arrow_next.svg" alt="" />
          </p>
        )}

        {currentSlide < countSlide - SLIDE_TO_SHOW && (
          <p className="slick-button-next" onClick={handleNextSlide}>
            <img src="/svg/arrow_next.svg" alt="" />
          </p>
        )}
        <div className="menu-container">
          <Slider {...settingsSliderMenu} ref={sliderRef}>
            {(category ?? []).map((item) => (
              <Link href={`/search/?categoryId=${item.id}`} key={item.id}>
                <a className="menu-item headline-04">{item.name}</a>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
