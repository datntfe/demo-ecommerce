import React from 'react';
import classNames from 'classnames';

import Button from 'components/Button';

import { TMemberCardProps } from './MemberCard.types.d';
import Icon, { EIconName } from '../Icon';

const MemberCard: React.FC<TMemberCardProps> = ({
  title,
  description,
  size = 'middle',
}) => (
  <div className={classNames('MemberCard', size)}>
    <div className='MemberCard-header'>
      <Icon name={EIconName.Crown} />
      <span className='MemberCard-header-title'>{title}</span>
    </div>
    <div className='MemberCard-body'>
      {description && description.map(() => (
          <li className='MemberCard-body-item'>
            <Icon name={EIconName.Done} />
            <span className='MemberCard-body-item-text'>Hạn mức nạp Shopdi Xu/ ngày <b>500.000</b></span>
          </li>
        ))}
    </div>
    <Button title="Nâng cấp" size="large" primary />
  </div>
);

export default MemberCard;
