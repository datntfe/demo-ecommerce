/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Collapse, Row } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

import { Paths } from 'routers';

import { TFooterProps } from './Footer.types.d';

const { Panel } = Collapse;

const Footer: React.FC<TFooterProps> = () => {
  const isMobile = false;

  const dataMenuSupport = [
    { link: 'tel: 0818442288', title: 'Hotline và chat trực tuyến (24/7)' },
    { link: 'mailto: support@shopdi.io', title: 'Trung tâm hỗ trợ' },
    { link: 'mailto: support@shopdi.io', title: 'Gửi yêu cầu hỗ trợ' },
    {
      link: 'mailto: support@shopdi.io',
      title: 'Hỗ trợ khách hàng: support@shopdi.io',
    },
    {
      link: 'https://shopdi.com.vn/huong-dan/',
      title: 'Hướng dẫn đặt hàng và thanh toán',
    },
    {
      link: 'https://shopdi.com.vn/quy-che-hoat-dong/',
      title: 'Quy chế hoạt động website',
    },
    {
      link: 'https://shopdi.com.vn/dieu-khoan-dich-vu/',
      title: 'Điều khoản sử dụng',
    },
  ];

  const dataMenuShopdi = [
    {
      link: 'https://shopdi.com.vn/thong-tin-du-an/',
      title: 'Thông tin dự án',
    },
    {
      link: 'https://shopdi.com.vn/shopdi-xu/',
      title: 'Chính sách đổi Shopdi Xu',
    },
    {
      link: 'https://shopdi.com.vn/chinh-sach-bao-mat/',
      title: 'Chính sách bảo mật',
    },
    {
      link: 'https://shopdi.com.vn/chinh-sach-quyen-rieng-tu/',
      title: 'Chính sách quyền riêng tư',
    },
    {
      link: 'https://shopdi.com.vn/chinh-sach-doi-tra-hang/',
      title: 'Chính sách kiểm hàng, đổi trả và hoàn tiền',
    },
  ];

  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer-wrapper">
          <Row gutter={[24, 24]}>
            <Col span={24} lg={{ span: 5 }} md={{ span: 12 }}>
              <div className="Footer-wrapper-item">
                <Link href={Paths.Home} passHref>
                  <a className="Footer-logo">
                    <Image
                      src="/img/logo-light.svg"
                      alt="Shopdi Logo"
                      layout="fill"
                    />
                  </a>
                </Link>

                <h4 className="Footer-title">Công ty cổ phần SHOPDI</h4>
                <p>
                  Công ty Cổ phần Shopdi Địa chỉ trụ sở: số 4 Trần Nhật Duật, P.
                  Tân Định, Q.1, TP. Hồ Chí Minh Mã số thuế 0317185857 Giấy
                  Chứng nhận đăng ký Doanh nghiệp lần đầu ngày 07/03/2022 cấp
                  bởi Phòng Đăng ký kinh doanh, Sở Kế hoạch và Đầu tư TP.HCM
                </p>

                <div className="Footer-bct">
                  <img src="/img/image-bct.svg" alt="Bộ Công Thươngg Logo" />
                </div>
              </div>
            </Col>
            <Col span={24} lg={{ span: 4 }} md={{ span: 12 }}>
              {isMobile ? (
                <Collapse
                  expandIconPosition="right"
                  accordion
                  expandIcon={({ isActive }): React.ReactElement => (
                    <div className="Footer-panel-icon">
                      {isActive ? (
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.6936 12H19.6936"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.6936 5V19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.6936 12H19.6936"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                >
                  <Panel
                    key={1}
                    header={<h4 className="Footer-title">HỖ TRỢ KHÁCH HÀNG</h4>}
                  >
                    <ul>
                      {dataMenuSupport.map((item, index) => (
                        <li key={index}>
                          <a href={item.link}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </Collapse>
              ) : (
                <div className="Footer-wrapper-item">
                  <h4 className="Footer-title">HỖ TRỢ KHÁCH HÀNG</h4>
                  <ul>
                    {dataMenuSupport.map((item, index) => (
                      <li key={index}>
                        <a href={item.link}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Col>
            <Col span={24} lg={{ span: 4 }} md={{ span: 12 }}>
              {isMobile ? (
                <Collapse
                  expandIconPosition="right"
                  accordion
                  expandIcon={({ isActive }): React.ReactElement => (
                    <div className="Footer-panel-icon">
                      {isActive ? (
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.6936 12H19.6936"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.6936 5V19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.6936 12H19.6936"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                >
                  <Panel
                    key={1}
                    header={<h4 className="Footer-title">VỀ SHOPDI</h4>}
                  >
                    <ul>
                      {dataMenuShopdi.map((item, index) => (
                        <li key={index}>
                          <a href={item.link}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </Collapse>
              ) : (
                <div className="Footer-wrapper-item">
                  <h4 className="Footer-title">VỀ SHOPDI</h4>
                  <ul>
                    {dataMenuShopdi.map((item, index) => (
                      <li key={index}>
                        <a href={item.link}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Col>
            <Col span={24} lg={{ span: 6 }} md={{ span: 12 }}>
              <div className="Footer-wrapper-item">
                <h4 className="Footer-title">TẢI ỨNG DỤNG</h4>
                <div className="Footer-download d-flex flex-wrap">
                  <a
                    href="https://apps.apple.com/us/app/shopdi/id1625578140"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-download-item"
                  >
                    <img
                      src="/img/image-download-app-store.svg"
                      alt="Shopdi App App Store"
                    />
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=io.shopdi.app"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-download-item"
                  >
                    <img
                      src="/img/image-download-google-play.svg"
                      alt="Shopdi App Google Play"
                    />
                  </a>
                </div>
                <h4 className="Footer-title">KẾT NỐI VỚI CHÚNG TÔI</h4>
                <div className="Footer-socials d-flex flex-wrap">
                  <a
                    href="https://www.facebook.com/shopdi.official"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-socials-item"
                  >
                    <img src="/icons/icon-facebook.svg" alt="" />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCUEJ-fUE4-ONf-LVdizZSTg"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-socials-item"
                  >
                    <img src="/icons/icon-youtube.svg" alt="" />
                  </a>
                  <a
                    href="https://t.me/ShopdiOfficial"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-socials-item"
                  >
                    <img src="/icons/icon-telegram.svg" alt="" />
                  </a>
                  <a
                    href="https://twitter.com/shopdi_official"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-socials-item"
                  >
                    <img src="/icons/icon-twitter.svg" alt="" />
                  </a>
                  <a
                    href="https://shopdi.com.vn/"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-socials-item"
                  >
                    <img src="/icons/icon-zalo.svg" alt="" />
                  </a>
                  <a
                    href="https://shopdi.medium.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-socials-item"
                  >
                    <img src="/icons/icon-medium.svg" alt="" />
                  </a>
                </div>
              </div>
            </Col>
            <Col span={24} lg={{ span: 5 }} md={{ span: 12 }}>
              <div className="Footer-wrapper-item">
                <h4 className="Footer-title">PHƯƠNG THỨC THANH TOÁN</h4>
                <div className="Footer-payment d-flex flex-wrap">
                  <a
                    href="https://visa.com"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-payment-item"
                  >
                    <img src="/icons/icon-visa.svg" alt="" />
                  </a>
                  <a
                    href="https://momo.com"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-payment-item"
                  >
                    <img src="/icons/icon-momo.svg" alt="" />
                  </a>
                  <a
                    href="https://zalopay.com"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-payment-item"
                  >
                    <img src="/icons/icon-zalopay.svg" alt="" />
                  </a>
                  <a
                    href="https://vnpay.com"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-payment-item"
                  >
                    <img src="/icons/icon-vnpay.svg" alt="" />
                  </a>
                  <a
                    href="https://mastercard.com"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-payment-item"
                  >
                    <img src="/icons/icon-mastercard.svg" alt="" />
                  </a>
                  <a
                    href="https://jcb.com"
                    target="_blank"
                    rel="noreferrer"
                    className="Footer-payment-item"
                  >
                    <img src="/icons/icon-jcb.svg" alt="" />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <div className="Footer-copyright">
            <p>© 2022. Bản quyền Công Ty Cổ Phần Shopdi</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
