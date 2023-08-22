import { Product } from './product';
import { Coupon } from './coupon';

export interface Cart {
  id: string;
  // QUESTION: What does the `?` do? Is it different than using | undefined in the type?
  products?: Product[];
  coupons?: Coupon[];
  shippingPrice?: number;
  taxes?: number;
}