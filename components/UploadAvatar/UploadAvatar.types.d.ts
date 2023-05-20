import { EIconName } from '@/components/Icon';

export type TUploadAvatarProps = {
  value?: string;
  iconName?: EIconName;
  onChange?: (url: File) => void;
};
