import React from 'react';

import { TProductDetailContentProps } from './ProductDetailContent.types';

const ProductDetailContent: React.FC<TProductDetailContentProps> = () => (
  <div className="ProductDetailContent">
    <img src="/img/image-product-description.png" alt="" />
    <h4>Màn hình</h4>
    <table>
      <tr>
        <td>Công nghệ màn hình</td>
        <td>OLED</td>
      </tr>
      <tr>
        <td>Độ phân giải</td>
        <td>1284 x 2778 Pixels</td>
      </tr>
      <tr>
        <td>Màn hình rộng</td>
        <td>6.7" - Tần số quét 120 Hz</td>
      </tr>
      <tr>
        <td>Độ sáng tối đa</td>
        <td>1200 nits</td>
      </tr>
      <tr>
        <td>Mặt kính cảm ứng</td>
        <td>Kính cường lực Ceramic Shield</td>
      </tr>
    </table>

    <h4>Camera sau</h4>
    <table>
      <tr>
        <td>Độ phân giải</td>
        <td>3 Cameras 12 MP</td>
      </tr>
      <tr>
        <td>Quay phim</td>
        <td>
          4K 2160p@24fps <br />
          4K 2160p@30fps <br />
          4K 2160p@60fps <br />
          FullHD 1080p@120fps <br />
          FullHD 1080p@240fps <br />
          FullHD 1080p@30fps <br />
          FullHD 1080p@60fps <br />
          HD 720p@30fps
        </td>
      </tr>
      <tr>
        <td>Đèn Flash</td>
        <td>Có</td>
      </tr>
      <tr>
        <td>Tính năng:</td>
        <td>Ban đêm (Night Mode)</td>
      </tr>
    </table>
  </div>
);

export default ProductDetailContent;
