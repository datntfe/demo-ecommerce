import React from 'react';
import { EAddressCardType } from 'components/AddressCard/AddressCard.enums';
import { TButtonProps } from 'components/Button';

export type TAddressCardProps = {
  type?: EAddressCardType;
  headerTitle?: React.ReactNode;
  name?: string;
  phoneNumber?: string;
  headerIcon?: React.ReactNode;
  address?: string;
  email?: string;
  home?: boolean;
  office?: boolean;
  preview?: boolean;
  radius?: boolean;
  defaultAddress?: boolean;
  children?: React.ReactNode;
  suffixSubButtonProps?: TButtonProps;
  suffixButtonProps?: TButtonProps;
  onEdit?: () => void;
  onDelete?: () => void;
};
