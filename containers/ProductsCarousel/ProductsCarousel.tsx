import React from 'react';

import Carousels from 'components/Carousels';
import ProductVertical from 'components/ProductVertical';
import CategoryHeader from 'components/CategoryHeader';

import { TProductsCarouselProps } from './ProductsCarousel.types';

const ProductsCarousel: React.FC<TProductsCarouselProps> = ({
  title,
  countdown,
  data = [],
}) => (
  <div className="ProductsCarousel">
    <div className="ProductsCarousel-wrapper">
      <CategoryHeader title={title} countdown={countdown} />

      <div className="ProductsCarousel-carousels">
        <Carousels
          slidesToShow={4}
          slidesToScroll={2}
          infinite={false}
          arrows
          dots={false}
          responsive={[
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                arrows: false,
              },
            },
          ]}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="ProductsCarousel-carousels-item">
              <ProductVertical />
            </div>
          ))}
        </Carousels>
      </div>
    </div>
  </div>
);

export default ProductsCarousel;
