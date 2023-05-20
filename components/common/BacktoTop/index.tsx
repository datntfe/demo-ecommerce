import React, { useEffect, useState } from 'react';
import Icon from 'components/common/Icon';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <div
      className="back-to-top"
      onClick={scrollToTop}
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <Icon name="back-to-top" />
    </div>
  );
};

export default ScrollButton;
