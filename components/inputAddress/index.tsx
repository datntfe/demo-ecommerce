import { Tabs } from 'antd';
import Icon from 'components/common/Icon';
import InputCustom from 'components/common/Input';
import {
  DistrictEntity,
  ProvinceEntity,
  WardEntity,
} from 'interfaces/types/user';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getDistrict, getProvince, getWard } from 'services/user';
import styled from 'styled-components';
import useOnClickOutside from 'utils/useClickOutSide';

const { TabPane } = Tabs;

const StyledWrap = styled.div`
  .caret-down {
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    position: absolute;
  }
  .tab-select {
    width: 100%;
    left: 0;
    top: 50px;
    position: absolute;
    background-color: #fff;
    height: 300px;
    z-index: 2;
    border: 1px solid #eeeeee;
  }
  .wrap-tab {
    height: 236px;
    overflow-y: scroll;
    padding-bottom: 10px;
  }
  .ant-tabs-nav-wrap {
    padding: 0 10px;
  }
`;
interface StyledItemAddressProps {
  active: boolean;
}
const StyledItemAddress = styled.div<StyledItemAddressProps>`
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#000' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  &:hover {
    background: #eeeeee;
  }
`;

interface InputAddressProps {
  selectedProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  setSelectedProvince: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string>>;
  setSelectedWard: React.Dispatch<React.SetStateAction<string>>;
  error?: boolean;
}

const InputAddress: React.FC<InputAddressProps> = ({
  selectedProvince,
  selectedDistrict,
  selectedWard,
  setSelectedProvince,
  setSelectedDistrict,
  setSelectedWard,
  error,
}) => {
  const wrap = useRef<HTMLDivElement>(null);
  const [province, setProvince] = useState<ProvinceEntity[]>([]);
  const [district, setDistrict] = useState<DistrictEntity[]>([]);
  const [ward, setWard] = useState<WardEntity[]>([]);
  const [show, setShow] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  useOnClickOutside(wrap, () => {
    setShow(false);
    setActiveKey('1');
  });

  useEffect(() => {
    const getProvinceFunc = async () => {
      const data = await getProvince();
      if (data.data.status) {
        setProvince(data.data.data);
      }
    };
    getProvinceFunc();
  }, []);

  useEffect(() => {
    const getDistrictFunc = async () => {
      if (!selectedProvince) {
        return;
      }

      const data = await getDistrict(selectedProvince);
      if (data.data.status) {
        setDistrict(data.data.data);
      }
    };
    getDistrictFunc();
  }, [selectedProvince, setSelectedDistrict, setSelectedWard]);

  useEffect(() => {
    const getWardFunc = async () => {
      if (!selectedDistrict) {
        return;
      }

      const data = await getWard(selectedDistrict);
      if (data.data.status) {
        setWard(data.data.data);
      }
    };
    getWardFunc();
  }, [selectedDistrict, setSelectedWard]);

  const renderAddress = () => {
    const pro = province.find((item) => item.id === selectedProvince)?.name;
    const dist = district.find((item) => item.id === selectedDistrict)?.name;
    const war = ward.find((item) => item.id === selectedWard)?.name;
    return `${pro ? `${pro}, ` : ''}${dist ? `${dist}, ` : ''}${war || ''}`;
  };

  return (
    <StyledWrap
      className="relative"
      ref={wrap}
      onClick={() => {
        if (!show) {
          setShow(true);
        }
      }}
    >
      <div>
        <InputCustom
          className=""
          type="text"
          placeholder={t.inputAddress}
          onChange={() => null}
          value={renderAddress()}
          error={error}
        />
        <div className="caret-down">
          <Icon name="caret-down" />
        </div>
      </div>
      {show && (
        <div className="tab-select">
          <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
            <TabPane tab={t.provinCity} key="1">
              <div className="wrap-tab">
                {province.map((item) => (
                  <StyledItemAddress
                    key={item.id}
                    onClick={() => {
                      setSelectedProvince(item.id);
                      setSelectedDistrict('');
                      setSelectedWard('');
                      setActiveKey('2');
                    }}
                    active={selectedProvince === item.id}
                  >
                    {item.name}
                  </StyledItemAddress>
                ))}
              </div>
            </TabPane>
            <TabPane tab={t.district} disabled={!selectedProvince} key="2">
              <div className="wrap-tab">
                {district.map((item) => (
                  <StyledItemAddress
                    key={item.id}
                    onClick={() => {
                      setSelectedDistrict(item.id);
                      setSelectedWard('');
                      setActiveKey('3');
                    }}
                    active={selectedDistrict === item.id}
                  >
                    {item.name}
                  </StyledItemAddress>
                ))}
              </div>
            </TabPane>
            <TabPane tab={t.ward} key="3" disabled={!selectedDistrict}>
              <div className="wrap-tab">
                {ward.map((item) => (
                  <StyledItemAddress
                    key={item.id}
                    onClick={() => {
                      setSelectedWard(item.id);
                      setShow(false);
                      setActiveKey('1');
                    }}
                    active={selectedWard === item.id}
                  >
                    {item.name}
                  </StyledItemAddress>
                ))}
              </div>
            </TabPane>
          </Tabs>
        </div>
      )}
    </StyledWrap>
  );
};

export default InputAddress;
