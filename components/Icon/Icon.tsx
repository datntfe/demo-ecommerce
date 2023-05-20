import React from 'react';
import classNames from 'classnames';

import { TIconProps } from './Icon.types';
import { EIconName } from './Icon.enums';

import StarFill from './StarFill';
import HeartFill from './HeartFill';
import Clock from './Clock';
import Plus from './Plus';
import ShopdiCoin from './ShopdiCoin';
import Google from './Google';
import Facebook from './Facebook';
import Search from './Search';
import SearchShopdi from './SearchShopdi';
import AngleDown from './AngleDown';
import Ios from './Ios';
import Android from './Android';
import CaretDown from './CaretDown';
import ShopdiCart from './ShopdiCart';
import AngleLeft from './AngleLeft';
import AngleRight from './AngleRight';
import PlayCircle from './PlayCircle';
import ArrowLineUp from './ArrowLineUp';
import TicketShopdi from './TicketShopdi';
import TrashShopdi from './TrashShopdi';
import Minus from './Minus';
import X from './X';
import HomeShopdi from './HomeShopdi';
import BriefcaseShopdi from './BriefcaseShopdi';
import Info from './Info';
import TruckShopdi from './TruckShopdi';
import Copy from './Copy';
import CheckCircle from './CheckCircle';
import Menu from './Menu';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import MapPointShopdi from './MapPointShopdi';
import ClockShopdi from './ClockShopdi';
import OrderShopdi from './OrderShopdi';
import BoxShopdi from './BoxShopdi';
import NotificationShopdi from './NotificationShopdi';
import StarShopdi from './StarShopdi';
import ReferShopdi from './ReferShopdi';
import Camera from './Camera';
import Crown from './Crown';
import Done from './Done';
import Wallet from './Wallet';
import CameraShopdi from './CameraShopdi';
import WarningCircleShopdi from './WarningCircleShopdi';
import CheckCircleShopdi from './CheckCircleShopdi';
import Calendar from './Calendar';
import PaymentTicket from './PaymentTicket';
import PaymentCard from './PaymentCard';
import PaymentWallet from './PaymentWallet';
import PaymentTransfer from './PaymentTransfer';

const Icon: React.FC<TIconProps> = ({ name, className, color, onClick }) => {
  const renderIcon = (): React.ReactElement => {
    switch (name) {
      case EIconName.StarFill:
        return <StarFill color={color} />;
      case EIconName.HeartFill:
        return <HeartFill color={color} />;
      case EIconName.Clock:
        return <Clock color={color} />;
      case EIconName.Plus:
        return <Plus color={color} />;
      case EIconName.ShopdiCoin:
        return <ShopdiCoin color={color} />;
      case EIconName.Google:
        return <Google color={color} />;
      case EIconName.Facebook:
        return <Facebook color={color} />;
      case EIconName.Search:
        return <Search color={color} />;
      case EIconName.SearchShopdi:
        return <SearchShopdi color={color} />;
      case EIconName.AngleDown:
        return <AngleDown color={color} />;
      case EIconName.Ios:
        return <Ios color={color} />;
      case EIconName.Android:
        return <Android color={color} />;
      case EIconName.CaretDown:
        return <CaretDown color={color} />;
      case EIconName.ShopdiCart:
        return <ShopdiCart color={color} />;
      case EIconName.AngleLeft:
        return <AngleLeft color={color} />;
      case EIconName.AngleRight:
        return <AngleRight color={color} />;
      case EIconName.PlayCircle:
        return <PlayCircle color={color} />;
      case EIconName.ArrowLineUp:
        return <ArrowLineUp color={color} />;
      case EIconName.TicketShopdi:
        return <TicketShopdi color={color} />;
      case EIconName.TrashShopdi:
        return <TrashShopdi color={color} />;
      case EIconName.Minus:
        return <Minus color={color} />;
      case EIconName.X:
        return <X color={color} />;
      case EIconName.HomeShopdi:
        return <HomeShopdi color={color} />;
      case EIconName.BriefcaseShopdi:
        return <BriefcaseShopdi color={color} />;
      case EIconName.Info:
        return <Info color={color} />;
      case EIconName.TruckShopdi:
        return <TruckShopdi color={color} />;
      case EIconName.Copy:
        return <Copy color={color} />;
      case EIconName.CheckCircle:
        return <CheckCircle color={color} />;
      case EIconName.Menu:
        return <Menu color={color} />;
      case EIconName.ArrowLeft:
        return <ArrowLeft color={color} />;
      case EIconName.ArrowRight:
        return <ArrowRight color={color} />;
      case EIconName.MapPointShopdi:
        return <MapPointShopdi color={color} />;
      case EIconName.ClockShopdi:
        return <ClockShopdi color={color} />;
      case EIconName.OrderShopdi:
        return <OrderShopdi color={color} />;
      case EIconName.BoxShopdi:
        return <BoxShopdi color={color} />;
      case EIconName.NotificationShopdi:
        return <NotificationShopdi color={color} />;
      case EIconName.StarShopdi:
        return <StarShopdi color={color} />;
      case EIconName.ReferShopdi:
        return <ReferShopdi color={color} />;
      case EIconName.Camera:
        return <Camera color={color} />;
      case EIconName.CameraShopdi:
        return <CameraShopdi color={color} />;
      case EIconName.Crown:
        return <Crown color={color} />;
      case EIconName.Done:
        return <Done color={color} />;
      case EIconName.Wallet:
        return <Wallet color={color} />;
      case EIconName.WarningCircleShopdi:
        return <WarningCircleShopdi color={color} />;
      case EIconName.CheckCircleShopdi:
        return <CheckCircleShopdi color={color} />;
      case EIconName.Calendar:
        return <Calendar color={color} />;
      case EIconName.PaymentTicket:
        return <PaymentTicket color={color} />;
      case EIconName.PaymentCard:
        return <PaymentCard color={color} />;
      case EIconName.PaymentWallet:
        return <PaymentWallet color={color} />;
      case EIconName.PaymentTransfer:
        return <PaymentTransfer color={color} />;
      default:
        return <></>;
    }
  };

  return (
    <div
      className={classNames(
        'Icon',
        'flex',
        'justify-center',
        'items-center',
        className,
      )}
      onClick={onClick}
    >
      {renderIcon()}
    </div>
  );
};

export default Icon;
