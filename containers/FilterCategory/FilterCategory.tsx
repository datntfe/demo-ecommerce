import React from 'react';
import { Form } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Button, { EButtonStyleType } from 'components/Button';
import Checkbox from 'components/Checkbox';
import PricesForm from 'components/PricesForm';

import Drawer from 'components/Drawer';
import { TFilterCategoryProps } from './FilterCategory.types';

const FilterCategory: React.FC<TFilterCategoryProps> = ({
  visible,
  onClose,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const isDrawerStyle = typeof visible === 'boolean';
  const [form] = Form.useForm();

  const renderFilterCategoryWrapper = (): React.ReactElement => (
    <div className="FilterCategory-wrapper">
      {!isMobile && (
        <div className="FilterCategory-toggle" onClick={onClose}>
          Ẩn bộ lọc
        </div>
      )}

      <Form form={form} layout="vertical">
        <div className="FilterCategory-group">
          <h5 className="FilterCategory-group-title">Thương hiệu</h5>
          <div className="FilterCategory-group-list">
            {[1, 2, 3].map((item) => (
              <Form.Item name={`brand${item}`}>
                <Checkbox label={`Thương hiệu ${item}`} />
              </Form.Item>
            ))}
          </div>
        </div>

        <div className="FilterCategory-group">
          <h5 className="FilterCategory-group-title">Danh mục</h5>
          <div className="FilterCategory-group-list">
            {[1, 2, 3].map((item) => (
              <Form.Item name={`category${item}`}>
                <Checkbox label={`Danh mục ${item}`} />
              </Form.Item>
            ))}
          </div>
        </div>

        <div className="FilterCategory-group">
          <h5 className="FilterCategory-group-title">Chất liệu</h5>
          <div className="FilterCategory-group-list">
            {[1, 2, 3].map((item) => (
              <Form.Item name={`material${item}`}>
                <Checkbox label={`Chất liệu ${item}`} />
              </Form.Item>
            ))}
          </div>
        </div>

        <div className="FilterCategory-group">
          <h5 className="FilterCategory-group-title">Đơn vị vận Chuyển</h5>
          <div className="FilterCategory-group-list">
            {[1, 2, 3].map((item) => (
              <Form.Item name={`shipping${item}`}>
                <Checkbox label={`Đơn vị vận Chuyển ${item}`} />
              </Form.Item>
            ))}
          </div>
        </div>

        <div className="FilterCategory-group">
          <h5 className="FilterCategory-group-title">Giá</h5>
          <div className="FilterCategory-group-list">
            <Form.Item name="prices">
              <PricesForm min={10000000} max={1000000000} />
            </Form.Item>
          </div>
        </div>

        <div className="FilterCategory-group">
          <h5 className="FilterCategory-group-title">Đánh giá</h5>
          <div className="FilterCategory-group-list">
            {[5, 4, 3, 2, 1].map((item) => (
              <Form.Item name={`rating${item}`}>
                <Checkbox label={`Từ ${item} sao`} />
              </Form.Item>
            ))}
          </div>
        </div>

        <div className="FilterCategory-group submit">
          <Button
            htmlType="submit"
            title="Lọc"
            styleType={EButtonStyleType.OUTLINE_BLACK}
          />
        </div>
      </Form>
    </div>
  );

  return isDrawerStyle ? (
    <Drawer visible={visible} onClose={onClose} placement="right">
      {renderFilterCategoryWrapper()}
    </Drawer>
  ) : (
    <div className="FilterCategory">{renderFilterCategoryWrapper()}</div>
  );
};

export default FilterCategory;
