import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { scrollToTop } from 'utils/functions';
import Icon, { EIconColor, EIconName } from 'components/Icon';

import { TScrollToTopProps } from './ScrollToTop.types.d';

const ScrollToTop: React.FC<TScrollToTopProps> = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 520) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={classNames('ScrollToTop', { active: isShow })}
      onClick={(): void => scrollToTop()}
    >
      <Icon name={EIconName.ArrowLineUp} color={EIconColor.WHITE} />
    </div>
  );
};

export default ScrollToTop;
