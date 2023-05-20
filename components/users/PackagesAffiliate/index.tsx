import Icon from 'components/common/Icon';
import React from 'react';

interface PackagesAffiliateProps {
  packageIcon: string;
  packageName: string;
  packageId: string;
  myPackageId: string;
  isLoading?: boolean;
  description: string;
  onUpdate: (id: string) => void;
}

const PackagesAffiliate: React.FC<PackagesAffiliateProps> = ({
  packageIcon,
  packageId,
  packageName,
  myPackageId,
  isLoading,
  onUpdate,
  description,
}) => (
  <div className="section packages-item">
    <div className="d-flex justify-content-between">
      <div className="avatar d-flex align-items-center">
        <img src={packageIcon || '/svg/avatar.svg'} alt="icon" />
        <span className="mlt-2 botton-label">{packageName}</span>
      </div>
      {myPackageId === packageId && <Icon name="check-circle" />}
    </div>
    <div className="headline-04 mtt-3">{description}</div>
    <button
      className="button button-primary w-100 size-m mtt-4"
      type="button"
      disabled={myPackageId === packageId || isLoading}
      onClick={() => onUpdate(packageId)}
    >
      Nâng cấp
    </button>
  </div>
);

export default PackagesAffiliate;
