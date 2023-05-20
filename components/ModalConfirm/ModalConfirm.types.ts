import { EIconName } from 'components/Icon';

export type TModalConfirmProps = {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  width?: number;
  loading?: boolean;
  title?: string;
  description?: string;
  iconName?: EIconName;
};
