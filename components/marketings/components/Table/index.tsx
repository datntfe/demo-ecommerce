import React from 'react';

const TableComponent = () => (
  <div className="Table-component">
    <table>
      <thead>
        <tr>
          <th>Người tham gia</th>
          <th>Giải thưởng</th>
          <th>Sản phẩm săn</th>
          <th>Giá trị giải thưởng</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((item) => (
          <tr>
            <td>
              <span>@user123</span>
              <br />
              <span className="id-user">ID: 0123456</span>
            </td>
            <td>THÁNH SĂN LÃO LÀNG</td>
            <td>Iphone 14 Pro Max</td>
            <td>35.000.000 VND</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default TableComponent;
