import { Col, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AccodionComponent from 'components/marketings/components/Accodion';
import ButtonComponent from 'components/marketings/components/Button';
import CardComponent from 'components/marketings/components/Card';
import ImageTitleComponent from 'components/marketings/components/ImageTitle';
import InputComponent from 'components/marketings/components/Input';
import TableComponent from 'components/marketings/components/Table';
import Tab from 'components/marketings/components/Tabs';
import { useMediaQuery } from 'react-responsive';
import React from 'react';

const dataFaq = [
  {
    number: '01',
    title: 'Chương trình Shopdi Connect là gì?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque repellat, eum, molestiae doloribus impedit assumenda placeat optio ratione, dolores suscipit id doloremque animi dolore amet aliquam laboriosam vero! Deserunt.',
  },
  {
    number: '02',
    title: 'Điều kiện để trở thành một Connector là gì?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nam quos reiciendis, temporibus porro, dolorum itaque nemo sequi, provident iure vitae. Quis, cumque officia? Eum temporibus eos sed aut iure!',
  },
  {
    number: '03',
    title: 'Làm thế nào để kiếm được mức thưởng lên tới 700 triệu/tháng?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit impedit inventore saepe. Doloribus nesciunt rem voluptas hic suscipit minus reprehenderit consequatur eos labore molestias, atque at accusantium repellendus id impedit.',
  },
];
const dataListTabs = [
  {
    label: 'Tuần 1 (05/09/2022 - 11/09/2022)',
    value: 'WEEK1',
    children: <TableComponent />,
  },
  {
    label: 'Tuần 2 (12/09/2022 - 18/09/2022)',
    value: 'WEEK2',
    children: <TableComponent />,
  },
];

const LandingPageWelcome = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  return (
    <main className="wrapper-2">
      <div className="container">
        <section className="banner-home">
          <img src="/img/banner-home-1.png" alt="" />
        </section>
      </div>
      <div className="container">
        <ImageTitleComponent className="default" pictureUrl="/img/title.png" />
        <img src="/img/chitiet.png" alt="" />
      </div>
      <div className="container">
        <ImageTitleComponent className="default" pictureUrl="/img/step.png" />
        <img src="/img/banner-step.png" alt="" />
      </div>
      <div className="container">
        <ImageTitleComponent className="default" pictureUrl="/img/hapdan.png" />
        <section>
          <Row
            gutter={[64, 48]}
            className={`${isMobile ? 'scroll-x flex-no-wrap' : ''}`}
          >
            {[1, 2].map((item) => (
              <Col key={item} span={24} md={{ span: 12 }}>
                <CardComponent
                  title="SHOPDI CONNECT TRỞ THÀNH SHOPDI CONECTOR NGAY! "
                  description="Nhận ngay lợi nhuận lên tới 25% không giới hạn khi giới thiệu thành công người dùng click xem giá bí mật và giá giảm không giới hạn tại Shopdi. Giới thiệu càng nhiều, thu nhập càng khủng."
                  urlImage="/img/img-card.png"
                  classModify="bg-white border-radius"
                >
                  <div className="Card-item-date d-flex align-items-center justify-content-between">
                    <p className="Card-item-date">Ngày hết hạn: 30/12/2022</p>
                    <a href="#" className="Card-item-link">
                      Xem chi tiết
                    </a>
                  </div>
                </CardComponent>
              </Col>
            ))}
          </Row>
        </section>
      </div>
      <div className="container">
        <ImageTitleComponent
          className="default"
          pictureUrl="/img/nhanxutitle.png"
        />
        <img src="/img/nhanxu-banner.png" alt="" />
      </div>
      <section className="QA">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <h3>Câu hỏi thường gặp</h3>
              <AccodionComponent dataFaq={dataFaq} />
              <div className="QA-form">
                <h2>Bạn có câu hỏi khác</h2>
                <form action="" className="form-submit">
                  <InputComponent placeholder="Email của bạn..." />
                  <TextArea
                    className="mt-4"
                    rows={6}
                    placeholder="Nhập văn bản..."
                    maxLength={6}
                  />
                  <ButtonComponent title="SEND" classNameOut="button-Qa" />
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="faq-content">
                <div className="faq-content-img text-center">
                  <img src="/img/faq.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default LandingPageWelcome;
