import React, { useState } from 'react';
import classNames from 'classnames';

interface Tab {
  className?: string;
  defaultActiveKey: string;
  isMobile: boolean;
  data: any;
}

const Tab = ({ className, defaultActiveKey, isMobile, data = [] }: Tab) => {
  const [activeKeyTab, setActiveKeyTab] = useState(defaultActiveKey);
  const handleChangeActiveTab = (key: any) => {
    setActiveKeyTab(key);
  };
  return (
    <div className={classNames('Tab-component')}>
      <div
        className={`Tab-tabs d-flex mb-5 ${
          isMobile ? 'scroll-x no-wrap' : ''
        } ${className ?? ''}`}
      >
        {data.map((item: any) => (
          <div
            key={item.value}
            className={classNames('Tab-tabs-item heading-02', {
              active: item.value === activeKeyTab,
            })}
            onClick={() => handleChangeActiveTab(item.value)}
          >
            {item.labelImage ? (
              <img className="label-images" src={item.labelImage} alt="" />
            ) : item.labelCountDown ? (
              <div> {item.label}</div>
            ) : (
              item.label
            )}
          </div>
        ))}
      </div>
      <div className="Tab-tabs-main">
        {data.find((item: any) => item.value === activeKeyTab)?.children}
      </div>
    </div>
  );
};

export default Tab;
