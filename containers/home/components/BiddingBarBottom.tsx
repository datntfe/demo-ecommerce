import Icon from 'components/common/Icon';
import ItemProduct from 'components/ListItem/ItemProduct';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducer';

const BiddingBarBottom: React.FC<PropsFromRedux> = ({
  isAuthentied,
  isShow,
  listInDeposit = [],
  listInProcess = [],
}) => {
  const [isExpanded, setIsExpaned] = useState(false);

  if (!listInProcess || !listInDeposit) {
    return null;
  }
  if (listInProcess.length === 0 && listInDeposit.length === 0) {
    return null;
  }
  if (!isAuthentied) {
    return null;
  }

  return null;

  return (
    <div className={`biddingBar ${isExpanded && 'expand'}`}>
      <div onClick={() => setIsExpaned(!isExpanded)} className="button-arrow">
        <Icon className="arrowIcon" name="arrow-bottom" />
      </div>

      {!isExpanded && (
        <div className="title-alert">
          <span className="quantity mr-2">
            {listInProcess.length + listInDeposit.length}
          </span>
          <span className="normal-text">Sản phẩm đang chờ</span>
          &nbsp;
          <Icon name="fire" />
        </div>
      )}
      {/* const reponse = await depositBiddingSKU(product.sku); */}
      {isExpanded && (
        <div className="biddingBar__products">
          {listInProcess.map((product, index) => (
            <ItemProduct isTypeBidding product={product} />
          ))}

          {listInDeposit.map((product, index) => (
            <ItemProduct isTypeBidding product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export interface BiddingBarBottomProps {}
const mapStateToProps = (state: RootState, ownProps: BiddingBarBottomProps) =>
  // orderBy
  ({
    ...ownProps,
    isAuthentied: state.user.profile !== undefined,
    listInProcess: state.homePage.listInProcess,
    listInDeposit: state.homePage.listInDeposit,
    isShow:
      [
        ...(state.homePage.listInDeposit || []),
        state.homePage.listInProcess || [],
      ].length > 0,
  });
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BiddingBarBottom);
