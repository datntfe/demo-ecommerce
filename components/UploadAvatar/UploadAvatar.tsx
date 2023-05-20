import React, { useEffect, useState } from 'react';

import Upload from 'components/Upload';
import { handleErrorImageUrl } from 'utils/functions';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import { REGEX } from 'common/constants';

import { TUploadAvatarProps } from './UploadAvatar.types.d';
import Avatar from 'components/Avatar';

const UploadAvatar: React.FC<TUploadAvatarProps> = ({
  value,
  iconName,
  onChange,
}) => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleUploadChange = (files: FileList | null): void => {
    if (files) {
      const file = Array.from(files)?.[0];
      setPreviewImage(URL.createObjectURL(file));
      setIsChanged(true);
      onChange?.(file);
    }
  };

  useEffect(() => {
    if (!isChanged) {
      if (REGEX.url.test(value || '')) {
        setPreviewImage(value);
      } else {
        setIsChanged(false);
        setPreviewImage('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="UploadAvatar">
      <Upload onChange={handleUploadChange}>
        <div className="UploadAvatar-wrapper">
          <div className="UploadAvatar-preview">
            <Avatar image={previewImage} size="100%" />
          </div>
          <div className="UploadAvatar-icon">
            <Icon
              name={iconName || EIconName.Camera}
              color={EIconColor.WHITE}
            />
          </div>
        </div>
      </Upload>
    </div>
  );
};

export default UploadAvatar;
