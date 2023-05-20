import React, { useState } from 'react';

import Icon, { EIconColor, EIconName } from 'components/Icon';

import { copyText } from 'utils/functions';

import { ECopyType } from './Copy.enums';
import { TCopyProps } from './Copy.types';

const Copy: React.FC<TCopyProps> = ({ type = ECopyType.TEXT, text }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    if (text) {
      copyText(text);
      setIsCopied(true);
    }
  };

  return (
    <div className="Copy d-flex" onClick={handleCopy}>
      <div className="Copy-icon">
        {(isCopied || type === ECopyType.ICON) && (
          <div className="Copy-icon-wrapper d-flex align-items-center justify-content-center">
            <Icon
              name={isCopied ? EIconName.CheckCircle : EIconName.Copy}
              color={isCopied ? EIconColor.DODGER_BLUE : undefined}
            />
          </div>
        )}
      </div>

      {type === ECopyType.TEXT && (
        <div className="Copy-title">
          {isCopied ? 'Đã sao chép' : 'Sao chép'}
        </div>
      )}
    </div>
  );
};

export default Copy;
