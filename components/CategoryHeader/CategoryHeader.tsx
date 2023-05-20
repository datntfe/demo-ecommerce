import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { Paths } from 'routers';
import CountdownTime from 'components/CountdownTime';
import { TCategoryHeaderProps } from './CategoryHeader.types';

const CategoryHeader: React.FC<TCategoryHeaderProps> = ({
  title,
  countdown,
  link,
}) => (
  <div className={classNames('CategoryHeader')}>
    <div className="CategoryHeader-wrapper d-flex align-items-center justify-content-between">
      <div className="CategoryHeader-title d-flex align-items-center">
        {title}
        {countdown && (
          <CountdownTime
            defaultValue={countdown}
            render={({ hours, minutes, seconds }): React.ReactElement => (
              <div className="CategoryHeader-countdown d-flex align-items-center">
                <div className="CategoryHeader-countdown-item">
                  <span>{hours}</span>
                </div>
                <span>:</span>
                <div className="CategoryHeader-countdown-item">
                  <span>{minutes}</span>
                </div>
                <span>:</span>
                <div className="CategoryHeader-countdown-item">
                  <span>{seconds}</span>
                </div>
              </div>
            )}
          />
        )}
      </div>
      <Link href={link || Paths.AllProducts('type')} passHref>
        <a className="CategoryHeader-see-all">XEM TẤT CẢ</a>
      </Link>
    </div>
  </div>
);

export default CategoryHeader;
