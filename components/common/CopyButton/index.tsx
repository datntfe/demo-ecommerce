import React, { useState, useEffect } from 'react';
import Icon from 'components/common/Icon';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

interface ButtonCopyProps {
  element: React.RefObject<HTMLDivElement>;
}

const ButtonCopy: React.FC<ButtonCopyProps> = ({ element }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopied = () => {
    if (element.current) {
      const text = element.current.innerText;
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
    }
  };

  useEffect(() => {
    let timeOut: any = 0;
    if (copySuccess) {
      timeOut = setTimeout(() => {
        setCopySuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timeOut);
  }, [copySuccess]);

  return (
    <div>
      {copySuccess ? (
        <div>
          <Icon name="check-circle" size={16} />
          <span className="font-size11 ml-1">{t.copied}</span>
        </div>
      ) : (
        <div className="cursor-pointer" onClick={handleCopied}>
          <Icon name="copy-blue" />
        </div>
      )}
    </div>
  );
};

export default ButtonCopy;
