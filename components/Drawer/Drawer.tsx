import React from 'react';
import classNames from 'classnames';
import { Drawer as AntdDrawer } from 'antd';

import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TDrawerProps } from './Drawer.types';

const Drawer: React.FC<TDrawerProps> = ({
  className,
  visible,
  placement,
  onClose,
  children,
}) => (
  <AntdDrawer
    className={classNames('Drawer', className)}
    visible={visible}
    onClose={onClose}
    placement={placement}
    closeIcon={
      <div className="MenuMobile-close">
        <Icon name={EIconName.X} color={EIconColor.EBONY_CLAY} />
      </div>
    }
  >
    <div className="Drawer-wrapper">{children}</div>
  </AntdDrawer>
);

export default Drawer;
