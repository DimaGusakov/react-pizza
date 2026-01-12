import { CartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
};

export const calcTotalCount = (items: CartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.count, 0);
};
