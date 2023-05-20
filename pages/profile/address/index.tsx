import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import GuestLayout from 'layouts/GuestLayout';
import UserLayout from 'layouts/UserLayout';
import AddressCard from 'components/AddressCard';
import Button from 'components/Button';
import Icon, { EIconColor, EIconName } from 'components/Icon';
import { EAddressCardType } from 'components/AddressCard/AddressCard.enums';
import AddressFormModal from 'containers/AddressFormModal';

const AddressPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  const [addressFormModalState, setAddressFormModalState] = useState<{
    visible: boolean;
  }>({ visible: false });

  const handleOpenAddressFormModal = (): void => {
    setAddressFormModalState({ visible: true });
  };

  const handleCloseAddressFormModal = (): void => {
    setAddressFormModalState({ visible: false });
  };

  return (
    <GuestLayout>
      <UserLayout>
        <div className="AddressPage">
          <Row gutter={[24, 24]}>
            <Col md={{ span: 12 }} span={24}>
              <AddressCard
                name="Nguyễn Thanh Hiếu"
                phoneNumber="032424475"
                type={EAddressCardType.VERTICAL}
                address="50 Quang Trung, Phường xyz, Quận abc, Thành phố qwe, 700000, Việt Nam"
                email="hieunguyenn0001@gmail.com"
                home
                defaultAddress
                onEdit={handleOpenAddressFormModal}
              />
            </Col>
            <Col md={{ span: 12 }} span={24}>
              <AddressCard
                name="Nguyễn Thanh Hiếu"
                phoneNumber="032424475"
                type={EAddressCardType.VERTICAL}
                address="50 Quang Trung, Phường xyz, Quận abc, Thành phố qwe, 700000, Việt Nam"
                email="hieunguyenn0001@gmail.com"
                office
                onEdit={handleOpenAddressFormModal}
              />
            </Col>
          </Row>
          <div className="ProfilePage-submit">
            <Row gutter={[isMobile ? 16 : 24, 16]}>
              <Col>
                <Button
                  title="Thêm địa chỉ"
                  size="large"
                  reverse
                  primary
                  icon={<Icon name={EIconName.Plus} color={EIconColor.GOLD} />}
                  onClick={handleOpenAddressFormModal}
                />
              </Col>
            </Row>
          </div>
        </div>
      </UserLayout>

      <AddressFormModal
        {...addressFormModalState}
        onClose={handleCloseAddressFormModal}
      />
    </GuestLayout>
  );
};

export default AddressPage;
