import Icon from 'components/common/Icon';
import { HomePageProduct } from 'interfaces/response/home';
import en from 'locales/en';
import vn from 'locales/vn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducer';
import {
  addWishListsServices,
  removeWishListsServices,
} from 'services/products';
import { formatVietnamDong } from 'utils';
import { Rate } from 'antd';

const ItemLuxuryProduct: React.FC<PropsFromRedux> = ({
  product,
  isAuthentied,
}) => {
  // const [isTypeBidding, setIsTypeBidding] = useState(true);

  const {
    productId,
    sku,
    picture,
    name,
    displayPrice,
    isInWishList,
    brand,
    isInBidding,
    discountPercent,
    marketPrice,
    inventory,
    numberOfRating,
    sold,
    rating,
    biddingType,
  } = product;
  const [isLove, setIsLove] = useState(isInWishList);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

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
    <div className="productWrapper">
      <div className="productItem">
        <div className="wrap">
          <Link href={`/products/${sku}`}>
            <a className="hover-opacity">
              <div className="productImg">
                <img src={picture} alt={name} />
              </div>
            </a>
          </Link>
          <div className="productInfo">
            <div
              className={`tag-price ${
                biddingType !== 1 ? 'tag-price-small' : ''
              }`}
            >
              <img
                src={
                  biddingType === 1
                    ? '/img/auction-price-label.png'
                    : '/img/hidden-price-label.png'
                }
                alt="1"
              />
            </div>

            <div>
              <div className="brand-name-product">
                <div className="product-band d-flex justify-content-between mbt-2">
                  <h3 className="headline-03 mb-0">{brand}</h3>
                  <div className="cursor-pointer add-wish" onClick={handleLove}>
                    <Icon
                      name={`heart${isLove ? '-active' : ''}`}
                      size={18}
                      // color="#000"
                    />
                  </div>
                </div>
                <div className="quantity heading-06 mbt-2">
                  {t.hasSold}:&nbsp;{sold}
                </div>
                <div className="productItem__title mbt-2">
                  <h4>
                    <Link href={`/products/${sku}`}>
                      <a className="body-01 hover-color">{name} </a>
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="d-flex align-items-center mbt-2">
                <Rate
                  style={{ fontSize: 15 }}
                  count={5}
                  value={rating}
                  disabled
                />
                <div
                  className="heading-06 mlt-2"
                  style={{ lineHeight: 'unset' }}
                >
                  ({numberOfRating})
                </div>
              </div>
              {/* {isInBidding ? (
                <>
                  <div className="button-buy-now mtt-2">
                    <Link href={`/products/${sku}`}>
                      <a className="body-01 d-flex justify-content-between w-100">
                        <span>{t.buyNow}</span>
                        <span>{formatVietnamDong(displayPrice ?? 0)}</span>
                      </a>
                    </Link>
                  </div>

                  <div
                    className="hidden-label mtt-3"
                    style={{
                      width: '100%',
                      height: '38px',
                      background: 'url("/img/BUTTONUNLOCK(277X38).gif")',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }}
                    onClick={() => router.push(`/products/${sku}`)}
                  />
                </>
              ) : (
                <>
                  <div className="productItem__priceInfo d-flex align-items-center justify-content-between">
                    <span className="text-through">
                      {formatVietnamDong(displayPrice ?? 0)}
                    </span>
                    <p className="productItem__priceInfo__value mb-0 botton-label">
                      {formatVietnamDong(marketPrice ?? 0)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="button button-primary w-100 size-s button-second-buynow"
                    onClick={() => router.push(`/products/${sku}`)}
                  >
                    <span className="text-orange">{t.buyNow}</span>
                  </button>
                </>
              )} */}
              {biddingType === 1 ? (
                <div
                  className="hidden-label mtt-3"
                  style={{
                    width: '100%',
                    height: '38px',
                    background:
                      locale === 'en'
                        ? 'url("/img/turnButtonE.gif")'
                        : 'url("/img/turnButton.gif")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => router.push(`/products/${sku}`)}
                />
              ) : (
                <div
                  className="hidden-label mtt-3"
                  style={{
                    width: '100%',
                    height: '38px',
                    background:
                      locale === 'en'
                        ? 'url("/img/hiddenButtonE.gif")'
                        : 'url("/img/hiddenButton.gif")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => router.push(`/products/${sku}`)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ItemLuxuryProduct;

export interface ItemLuxuryProductProps {
  product: HomePageProduct;
}
const mapStateToProps = (
  state: RootState,
  ownProps: ItemLuxuryProductProps,
) => ({
  ...ownProps,
  isAuthentied: state.user.profile !== undefined,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ItemLuxuryProduct);
