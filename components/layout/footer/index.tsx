import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

const Footer: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <footer>
      <div className="container">
        <div className="d-flex wrap-col-footer">
          <div className="col-footer">
            <div>
              <Link prefetch={false} href="/">
                <a title="shopdi" className="footer__logo">
                  <img
                    style={{ maxHeight: 50 }}
                    src="/img/logo-white.png"
                    alt="shopdi"
                  />
                </a>
              </Link>
              <div className="title">{t.footerName}</div>
              <div
                className="font-size12"
                dangerouslySetInnerHTML={{ __html: t.footerInfo }}
              />
              {/* <StyledTextDescripton>
              Giấy CNĐKDN: 0317185857
              <br />
              Ngày cấp: 07/03/2022
            </StyledTextDescripton> */}
              {/* <div className="mt-2">
                <img
                  style={{ maxHeight: 49 }}
                  src="/img/certification.png"
                  alt="certification"
                />
              </div> */}
              <div className="font-size12">
                Người đại diện pháp luật: Đỗ Thị Bích Diệp
              </div>
              <Link prefetch={false} href="tel:19003395">
                <a className="font-size12">Số điện thoại: 19003395</a>
              </Link>
              <Link prefetch={false} href="mailto: Support@shopdi.com.vn">
                <a className="font-size12">Email: Support@shopdi.com.vn</a>
              </Link>
              <Link
                prefetch={false}
                href="http://online.gov.vn/Home/WebDetails/98122?AspxAutoDetectCookieSupport=1"
              >
                <a className="item mtt-3 d-block mb-0" target="_blank">
                  <img
                    style={{ maxHeight: 49 }}
                    src="/img/certification.png"
                    alt="certification"
                  />
                </a>
              </Link>
            </div>
          </div>
          {false && (
            <>
              <div className="d-flex flex-column col-footer">
                <div className="title text-uppercase">{t.footerSupport}</div>
                {/* <Link prefetch={false} href="/">
            <a className="item">
              Hotline: <span className="font-bold">1900-9999</span>
              <br />
              (1000 đ/phút, 8-21h kể cả T7, CN)
            </a>
          </Link> */}
                <Link prefetch={false} href="tel:19003395">
                  <a className="item">{t.footerHotline}</a>
                </Link>
                <Link prefetch={false} href="mailto:Support@shopdi.com.vn">
                  <a className="item">{t.footerSupportSmall}</a>
                </Link>
                {/* <Link prefetch={false} href="/">
              <a className="item">{t.sendRequest}</a>
            </Link>
            <Link prefetch={false} href="mailto:Support@shopdi.com.vn">
              <a className="item">{t.mailToSupport}</a>
            </Link> */}
                <Link prefetch={false} href="/huong-dan">
                  <a className="item">{t.footerSupportPayment}</a>
                </Link>
                <Link prefetch={false} href="/quy-che-hoat-dong">
                  <a className="item">{t.footerAction}</a>
                </Link>
                <Link prefetch={false} href="/dieu-khoan-dich-vu">
                  <a className="item">{t.tersm}</a>
                </Link>

                {/* <Link prefetch={false} href="/quy-dinh-chung">
            <a className="item">Hỗ trợ khách hàng: security@shopdi.vn </a>
          </Link> */}
              </div>
              <div className="d-flex flex-column col-footer">
                <div className="title text-uppercase">{t.footerAbount}</div>
                {/* <Link prefetch={false} href="/thong-tin-du-an">
              <a className="item">{t.footerProject}</a>
            </Link> */}
                <Link prefetch={false} href="/shopdi-xu">
                  <a className="item">{t.footerExchangeCoin}</a>
                </Link>
                <Link prefetch={false} href="/chinh-sach-bao-mat">
                  <a className="item">{t.footerPrivatePayment}</a>
                </Link>
                <Link prefetch={false} href="/chinh-sach-quyen-rieng-tu">
                  <a className="item">{t.footerPrivate}</a>
                </Link>
                {/* <Link prefetch={false} href="/cau-hoi-thuong-gap">
              <a className="item">{t.footerQA}</a>
            </Link> */}
                <Link prefetch={false} href="/chinh-sach-doi-tra-hang">
                  <a className="item">{t.returnGoods}</a>
                </Link>

                {/* <Link prefetch={false} href="/">
            <a className="item"> Chính sách giải quyết khiếu nại</a>
          </Link> */}
              </div>
            </>
          )}

          <div className="d-flex flex-column col-footer">
            {/* <div className="title text-uppercase">{t.downLoadApp}</div>
            <div className="mt-2 flex-column-mobile">
              <div className="mr-2">
                <Link
                  prefetch={false}
                  href="https://apps.apple.com/us/app/shopdi/id1625578140"
                >
                  <a className="hover-opacity">
                    <img src="/img/ios.png" alt="app-store" />
                  </a>
                </Link>
              </div>
              <div className="mt-2-mobile">
                <Link
                  prefetch={false}
                  href="https://play.google.com/store/apps/details?id=io.shopdi.app"
                >
                  <a className="hover-opacity">
                    <img src="/img/android.png" alt="google-play" />
                  </a>
                </Link>
              </div>
            </div> */}

            <div className="title text-uppercase">{t.connectOur}</div>
            <div className="d-flex flex-wrap">
              <div className="footer-socials-item">
                <Link
                  prefetch={false}
                  href="https://www.facebook.com/shopdi.official"
                >
                  <a className="hover-opacity">
                    <img
                      src="/img/facebook.png"
                      alt="facebook"
                      style={{ maxWidth: '32px' }}
                    />
                  </a>
                </Link>
              </div>
              <div className="footer-socials-item">
                <Link
                  prefetch={false}
                  href="https://www.youtube.com/channel/UCUEJ-fUE4-ONf-LVdizZSTg"
                >
                  <a className="hover-opacity">
                    <img
                      src="/img/youtube.png"
                      alt="youtube"
                      style={{ maxWidth: '32px' }}
                    />
                  </a>
                </Link>
              </div>

              <div className="footer-socials-item">
                <Link prefetch={false} href="https://t.me/ShopdiOfficial">
                  <a className="hover-opacity">
                    <img
                      src="/img/tele.png"
                      alt="telegram"
                      style={{ maxWidth: '32px' }}
                    />
                  </a>
                </Link>
              </div>
              <div className="footer-socials-item">
                <Link
                  prefetch={false}
                  href="https://twitter.com/shopdi_official"
                >
                  <a className="hover-opacity">
                    <img
                      src="/img/twitter.png"
                      alt="twitter"
                      style={{ maxWidth: '32px' }}
                    />
                  </a>
                </Link>
              </div>
              <div className="footer-socials-item">
                <Link prefetch={false} href="">
                  <a className="hover-opacity">
                    <img
                      src="/img/zalo.png"
                      alt="zalo"
                      style={{ maxWidth: '32px' }}
                    />
                  </a>
                </Link>
              </div>
              {/* <div className="footer-socials-item">
                <Link prefetch={false} href="https://shopdi.medium.com/">
                  <a className="hover-opacity">
                    <img src="/img/medium.png" alt="medium" />
                  </a>
                </Link>
              </div> */}
            </div>
            <div className="d-flex flex-column col-footer mt-3 hide-desktop">
              <p className="title text-uppercase">{t.footerPaymentGate}</p>
              {/* <img
              src="/img/payment.png"
              alt="payment-gate"
              style={{ maxWidth: '120px' }}
            /> */}
              <div className="d-flex">
                <div className="mrt-3">
                  <img
                    src="/img/payment1.png"
                    alt="payment-gate"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
                <img
                  src="/img/payment2.png"
                  alt="payment-gate"
                  style={{ maxWidth: '120px' }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column col-footer hide-mobile">
            <p className="title text-uppercase">{t.footerPaymentGate}</p>
            {/* <img
              src="/img/payment.png"
              alt="payment-gate"
              style={{ maxWidth: '120px' }}
            /> */}
            <div className="d-flex">
              <div className="mrt-3">
                <img
                  src="/img/payment1.png"
                  alt="payment-gate"
                  style={{ maxWidth: '120px' }}
                />
              </div>
              <img
                src="/img/payment2.png"
                alt="payment-gate"
                style={{ maxWidth: '120px' }}
              />
            </div>
          </div>
        </div>
        <div className="footer-bottom d-flex align-items-center">
          <p className="mb-0 small-caption ml-5">{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
