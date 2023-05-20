import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import Icon, { EIconName } from 'components/Icon';
import Button, { EButtonStyleType } from 'components/Button';
import { Paths } from 'routers';

import { TMyCoinCardProps } from './MyCoinCard.types';

const MyCoinCard: React.FC<TMyCoinCardProps> = () => (
  <div className={classNames('MyCoinCard')}>
    <div className="MyCoinCard-bg">
      <img src="/img/bg-my-coin-card.png" alt="" />
    </div>
    <div className="MyCoinCard-wrapper d-flex align-items-center">
      <div className="MyCoinCard-icon">
        <Icon name={EIconName.ShopdiCoin} />
      </div>
      <div className="MyCoinCard-info">
        <div className="MyCoinCard-info-description">ID: 0988676888</div>
        <div className="MyCoinCard-info-title">120.000 xu</div>
      </div>
      <div className="MyCoinCard-actions d-flex">
        <Link href={Paths.ChargeCoin} passHref>
          <Button title="Nạp xu" styleType={EButtonStyleType.WHITE} />
        </Link>
        <Link href={Paths.TransferCoin} passHref>
          <Button title="Chuyển xu" styleType={EButtonStyleType.WHITE} />
        </Link>
      </div>
    </div>
  </div>
);

export default MyCoinCard;
