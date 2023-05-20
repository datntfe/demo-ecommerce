import Icon from 'components/common/Icon';
import { IProduct } from 'interfaces/response/home';
import Link from 'next/link';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducer';
import {
  addWishListsServices,
  removeWishListsServices,
} from 'services/products';
import { formatVietnamDong } from 'utils';

const ItemProduct: React.FC<PropsFromRedux> = ({
  product,
  showAddtocart = false,
  isTypeBidding = false,
  onViewPrice,
  isAuthentied,
}) => {
  // const [isTypeBidding, setIsTypeBidding] = useState(true);

  const {
    sku,
    name,
    listPrice,
    thumbnailImages,
    isInBidding,
    ratingNumber,
    ratingStar,
    isInWishList,
    wishlistCount,
    productId,
  } = product;
  const [isLove, setIsLove] = useState(isInWishList);
  const renderBidding = () => (
    <>
      <div className="content">
        <span className="label">Giá bí mật</span>
        <span className="labelOver">Xem giá</span>
      </div>

      <div className="wrapBg">
        <div className="bgover">
          {Array.from({ length: 7 }, (v, k) => k + 1).map((e) => (
            <span className="bgover__item" key={`${e.toString()}ran`}>
              Giá bí mật
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const renderDeposit = () => (
    <div className="deposit">
      <span className="price">{formatVietnamDong(listPrice)}</span>
      <span className="label">Mua</span>
    </div>
  );

  const renderBuyNow = () => {
    if (!showAddtocart) {
      return null;
    }
    // eslint-disable-next-line react/jsx-wrap-multilines
    return (
      <div className="buynow">
        <span className="label">Thêm vào giỏ hàng</span>
      </div>
    );
  };

  const renderRatingStart = () => {
    const numEmptyStart = 5 - ratingStar;
    return (
      <div className="ratingStart">
        {[...Array(ratingStar)].map(() => (
          <div className="mr-1">
            <Icon name="rate-star-full" size={10} />
          </div>
        ))}
        {[...Array(numEmptyStart)].map(() => (
          <div className="mr-1">
            <Icon name="rate-start-empty" size={10} />
          </div>
        ))}
      </div>
    );
  };

  const handleLove = async () => {
    if (!isAuthentied) {
      return;
    }
    if (!isLove) {
      try {
        setIsLove(true);
        await addWishListsServices(productId);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setIsLove(false);
        await removeWishListsServices(productId);
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  return (
    <div className="productWrapper border-radius">
      <div className="productItem">
        <div className="wrap">
          <Link href={`/products/${sku}`}>
            <a>
              <div className="productImg bg-none border-radius">
                <img src={thumbnailImages} alt={name} />
              </div>
            </a>
          </Link>
          <div className="productInfo">
            <div className="productItem__rating">
              <div className="productItem__rating__left">
                {/* <div className="cursor-pointer" onClick={handleLove}>
                  <Icon
                    name={`heart${isLove ? '-active' : ''}`}
                    size={16}
                    color="#000"
                  />
                </div> */}
                {/* <span className="text-gray3 font-size12 ml-2">{wishlistCount}</span> */}
              </div>
              {/* <div className="productItem__rating__right">
                <span className="text-gray3 font-size12 mr-2 fix-position">{ratingNumber}</span>
                {renderRatingStart()}
              </div> */}
            </div>
            <Link href={`/products/${sku}`}>
              <a>
                <div className="font-bold hide-long-text">{name}</div>
              </a>
            </Link>
            <div className="productItem__priceInfo mbt-4">
              <p className="productItem__priceInfo__value">
                {formatVietnamDong(listPrice ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showAddtocart && (
        <div className={`biddingArea ${!isInBidding && 'buynow'}`}>
          {isInBidding && (
            <div className="activeContent">
              <div className="activeContent__block">
                <span className="label">Xem giá</span>
                <Icon name="coin-small" />
                <span className="value">12</span>
              </div>
              <div className="activeContent__block">
                <span className="label">Đặt cọc</span>
                <Icon name="coin-small" />
                <span className="value"> 30</span>
              </div>
            </div>
          )}

          {isInBidding
            ? isTypeBidding
              ? renderBidding()
              : renderDeposit()
            : renderBuyNow()}
        </div>
      )}
    </div>
  );
};

// export default ItemProduct;

export interface ItemProductProps {
  product: IProduct;
  onViewPrice?: any;
  showAddtocart?: boolean;
  isTypeBidding?: boolean;
}
const mapStateToProps = (state: RootState, ownProps: ItemProductProps) => ({
  ...ownProps,
  isAuthentied: state.user.profile !== undefined,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ItemProduct);
