import { Coupon } from "@models/coupon";
import { Product } from "@models/product";

export const computeSubTotal: (products: Product[]) => number = (
  products: Product[] = []
) => {
  return products?.reduce((subTotal, p) => subTotal + p.price, 0);
};

export const computeTotalCoupons: (coupons: Coupon[]) => number = (
  coupons: Coupon[] = []
) => {
  return coupons?.reduce((subTotal, p) => subTotal + p.discount, 0);
};

export const computeTotal: (
  subTotal: number,
  shippingPrice: number,
  taxes: number,
  totalCouponsAmount: number
) => number = (
  subTotal: number,
  shippingPrice: number,
  taxes: number,
  totalCouponsAmount: number
) => subTotal + shippingPrice + taxes - totalCouponsAmount;
