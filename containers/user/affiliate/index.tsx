import ButtonCopy from 'components/common/CopyButton';
import Icon from 'components/common/Icon';
import LeftSide from 'components/users/LeftSide';
import PackagesAffiliate from 'components/users/PackagesAffiliate';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAffiliatePackages,
  getAffiliateTransactions,
  getMyAffiliateInfo,
} from 'redux/action/affiliate';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import FormPopup from 'components/common/FormPopup';
import Link from 'next/link';

const StyledWrap = styled.div`
  margin-bottom: 50px;
  margin-top: 40px;
  .right-side {
    width: calc(100% - 320px);
    margin-left: 20px;
    padding: 25px;
    .title {
      font-size: 20px;
      border-bottom: 1px solid #c2c2c2;
      padding: 10px 0;
    }
    @media only screen and (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      padding: 20px 0px;
    }
  }
`;
export const StyledBox = styled.div`
  @media only screen and (max-width: 1199px) {
    padding: 10px 0px;
  }
  background: #ffffff;
  padding: 20px;
`;

const activeMenu = '7';
const PAGE_SIZE = 15;

const Affiliate = () => {
  const affiliateCode = useRef<HTMLDivElement>(null);
  const myLink = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const dispatch = useDispatch();
  const packages = useSelector((state: RootState) => state.affiliate.packages);
  const myAffiliate = useSelector(
    (state: RootState) => state.affiliate.myAffiliateInfo,
  );
  const [sowPackages, setShowPackages] = useState(false);
  const [showQRcode, setShowQRcode] = useState(false);
  const [showShareSocial, setShowShareSocial] = useState(false);

  useEffect(() => {
    dispatch(getMyAffiliateInfo());
    if (packages.length === 0) {
      dispatch(getAffiliatePackages());
    }
    dispatch(getAffiliateTransactions({ pageIndex: 1, pageSize: 20 }));
  }, [dispatch]);

  const onUpdate = (id: string) => {
    console.log(id);
  };

  return (
    <div className="container">
      {showQRcode && (
        <FormPopup
          button={t.confirm}
          onCancel={() => {
            setShowQRcode(false);
          }}
          onConfirm={() => null}
          title="Mã QR code của bạn"
          showButton={false}
          width={600}
          zIndex={90}
        >
          <div className="d-flex justify-content-center">
            <QRCodeSVG value={myAffiliate.linkRef} />
          </div>
        </FormPopup>
      )}
      {showShareSocial && (
        <FormPopup
          button={t.confirm}
          onCancel={() => {
            setShowShareSocial(false);
          }}
          onConfirm={() => null}
          title="Bấm để chia sẻ"
          showButton={false}
          width={600}
          zIndex={90}
        >
          <div className="d-flex justify-content-center">
            <div className="footer-socials-item mrt-2">
              <Link
                prefetch={false}
                href={`https://www.facebook.com/share.php?u=${myAffiliate.linkRef}`}
              >
                <a className="hover-opacity" target="_blank">
                  <img src="/img/facebook.png" alt="facebook" />
                </a>
              </Link>
            </div>
            {/* <div className="footer-socials-item mrt-2">
              <Link
                prefetch={false}
                href={` https://twitter.com/intent/tweet?url=${myAffiliate.linkRef}`}
              >
                <a className="hover-opacity" target="_blank">
                  <img src="/img/tele.png" alt="telegram" />
                </a>
              </Link>
            </div> */}
            <div className="footer-socials-item mrt-2">
              <Link
                prefetch={false}
                href={` https://twitter.com/intent/tweet?url=${myAffiliate.linkRef}`}
              >
                <a className="hover-opacity" target="_blank">
                  <img src="/img/twitter.png" alt="twitter" />
                </a>
              </Link>
            </div>
          </div>
        </FormPopup>
      )}

      <StyledWrap className="flex-column-mobile">
        <LeftSide activeMenu={activeMenu} />

        <div className="right-side" id="affiliate">
          <div className="font-bold title text-uppercase">
            {!sowPackages ? t.affiliate : 'Danh sách hạn mức thành viên'}
          </div>
          {!sowPackages ? (
            <StyledBox>
              <div className="banner d-flex justify-content-between">
                <div>
                  <div className="d-flex align-items-center">
                    <div className="avatar">
                      <img
                        src={myAffiliate.packageIcon || '/svg/avatar.svg'}
                        alt="icon"
                      />
                    </div>
                    <div className="mlt-4">
                      <div className="heading-05 text-white">
                        {myAffiliate.packageName}
                      </div>
                      <div className="headline-04 text-white d-flex align-items-center">
                        {myAffiliate.packageLimits}&nbsp;
                        <span className="mb-1">
                          <Icon name="coin-small" size={16} />
                        </span>
                        &nbsp;/ngày
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mtt-5">
                    <button
                      className="button button-white px-4 button-size36"
                      type="button"
                      onClick={() => setShowPackages(true)}
                    >
                      Chi tiết quyền lợi
                    </button>
                    <button
                      className="button mlt-4 px-4 button-orange button-size36"
                      type="button"
                    >
                      Nâng cấp
                    </button>
                  </div>
                </div>
                <div>
                  <div className="headline-02 text-orange">
                    {myAffiliate.packageProfit}%
                  </div>
                  <div className="headline-04 text-white">Hoa hồng</div>
                </div>
                <div className="clip">
                  <img src="/svg/clip.svg" alt="clip" />
                </div>
              </div>
              <div className="section mtt-4">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <Icon name="pig" />
                    <div className="headline-04 mt-1 mlt-1">
                      Tổng xu hoa hồng của bạn
                    </div>
                  </div>
                  <div>
                    <div className="botton-sizem d-flex align-items-center">
                      <div className="mt-1 mr-1">{myAffiliate.totalProfit}</div>
                      <Icon name="coin-small" size={16} />
                      <div className="mlt-2">
                        <Icon name="arrow-right-16" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mtt-4">
                  <div className="d-flex align-items-center">
                    <Icon name="medal" />
                    <div className="headline-04 mt-1 mlt-1">
                      TOP 1 trong 24h qua
                    </div>
                  </div>
                  <div>
                    <div className="botton-sizem d-flex align-items-center">
                      <div className="mt-1 mr-1">{myAffiliate.topProfit}</div>
                      <Icon name="coin-small" size={16} />
                      <div className="mlt-2">
                        <Icon name="arrow-right-16" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section mtt-4">
                <div className="heading-06 mbt-5">Giới thiệu mặc định</div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="headline-04">Mã giới thiệu</div>
                  <div className="d-flex align-items-center">
                    <div ref={affiliateCode} className="botton-sizem mrt-1">
                      {myAffiliate.affCode}
                    </div>
                    <ButtonCopy element={affiliateCode} />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mtt-4">
                  <div className="headline-04">Link giới thiệu</div>
                  <div className="d-flex align-items-center">
                    <div ref={myLink} className="botton-sizem mrt-1">
                      {myAffiliate.linkRef}
                    </div>
                    <ButtonCopy element={myLink} />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mtt-5">
                  <button
                    type="button"
                    className="button button-primary size-m w-300"
                    onClick={() => setShowShareSocial(true)}
                  >
                    Mời bạn bè
                  </button>
                  <div className="mlt-2">
                    <button
                      type="button"
                      className="button"
                      onClick={() => setShowQRcode(true)}
                    >
                      <img
                        src="/svg/genqr.svg"
                        alt="gencode"
                        style={{ height: '44px' }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </StyledBox>
          ) : (
            <StyledBox>
              <div className="d-flex flex-wrap">
                {packages.map((item) => (
                  <PackagesAffiliate
                    myPackageId={myAffiliate.packageId}
                    packageIcon={item.icon}
                    packageName={item.name}
                    packageId={item.id}
                    onUpdate={onUpdate}
                    description={item.description}
                  />
                ))}
              </div>
            </StyledBox>
          )}
        </div>
      </StyledWrap>
    </div>
  );
};

export default Affiliate;
