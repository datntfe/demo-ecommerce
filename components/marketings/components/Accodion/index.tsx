// @ts-ignore
import { Collapse } from 'antd';
import React from 'react';

const { Panel } = Collapse;

interface AccodionComponent {
  dataFaq: {
    number: string;
    title: string;
    content: string;
  }[];
}

const AccodionComponent = ({ dataFaq }: AccodionComponent) => (
  <div className="Faq">
    <Collapse
      expandIconPosition="right"
      accordion
      expandIcon={({ isActive }): React.ReactElement => (
        <div className="Faq-panel-icon">
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
      {dataFaq.map((item, index) => (
        <Panel
          key={index}
          header={
            <div className="Faq-panel-header d-flex align-items-center">
              <div className="Faq-panel-header-number">{item.number}</div>
              <h4 className="Faq-panel-header-title">{item.title}</h4>
            </div>
          }
        >
          <p className="Faq-panel-content">{item.content}</p>
        </Panel>
      ))}
    </Collapse>
  </div>
);
export default AccodionComponent;
