import { EKeyCartStep } from 'pages/cart/CartPage.enums';

export const dataCartStepOptions = [
  { key: 1, label: 'Giỏ hàng', value: EKeyCartStep.CART },
  { key: 2, label: 'Giao hàng', value: EKeyCartStep.DELIVERY },
  { key: 3, label: 'Thanh toán', value: EKeyCartStep.PAYMENT },
  { key: 4, label: 'Hoàn thành đơn hàng', value: EKeyCartStep.SUCCESS },
];
