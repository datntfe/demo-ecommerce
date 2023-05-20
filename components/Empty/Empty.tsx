import React from 'react';

import Icon, { EIconName } from 'components/Icon';

import { TEmptyProps } from './Empty.types';

const Empty: React.FC<TEmptyProps> = ({ iconName, title, text }) => (
  <div className="Empty">
    <div className="Empty-icon">
      <div className="Empty-icon-wrapper d-flex align-items-center justify-content-center">
        <Icon name={iconName || EIconName.SearchShopdi} />
      </div>
    </div>

    {title && <div className="Empty-title">{title}</div>}
    {text && <div className="Empty-text">{text}</div>}
  </div>
);

export default Empty;
