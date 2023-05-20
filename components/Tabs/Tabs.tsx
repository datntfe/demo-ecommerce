import React from 'react';
import classNames from 'classnames';
import { Tabs as AntdTabs } from 'antd';

import { TTabsProps } from './Tabs.types.d';

const { TabPane } = AntdTabs;

const Tabs: React.FC<TTabsProps> = ({
  defaultActiveKey,
  size,
  data = [],
  className,
  activeKey,
  styleType,
  onChange,
}) => (
  <div className={classNames('Tabs', className, styleType)}>
    <AntdTabs
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      size={size}
      onChange={onChange}
      animated={false}
      tabBarExtraContent={false}
      moreIcon={<></>}
    >
      {data.map((item) => (
        <TabPane
          tab={
            <div className="d-flex align-items-center">
              {item.title}{' '}
              {item.total && (
                <div className="Tabs-total d-flex align-items-center justify-content-center">
                  {item.total}
                </div>
              )}
            </div>
          }
          key={item.key}
        >
          {item.children}
        </TabPane>
      ))}
    </AntdTabs>
  </div>
);

export default Tabs;
