import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from 'components/Icon';

import Link from 'next/link';
import { TBreadcrumbProps } from './Breadcrumb.types.d';

const Breadcrumb: React.FC<TBreadcrumbProps> = ({
  className,
  options = [],
  separator,
}) => (
  <AntdBreadcrumb
    className={classNames('Breadcrumb', className)}
    separator={
      separator || (
        <Icon name={EIconName.AngleRight} color={EIconColor.TUNDORA} />
      )
    }
  >
    {options.map((option) => (
      <AntdBreadcrumb.Item key={option.key} onClick={option.onClick}>
        {option.link ? (
          <Link href={option.link}>{option.title}</Link>
        ) : (
          <>{option.title}</>
        )}
      </AntdBreadcrumb.Item>
    ))}
  </AntdBreadcrumb>
);

export default Breadcrumb;
