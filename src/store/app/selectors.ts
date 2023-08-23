import { createSelector } from '@reduxjs/toolkit';
import { selectRootState } from '..';

// QUESTION: Why are we using createSelector here? What is the advantage over
// plain functions?
// ANSWER: CreateSelector enables us to write a less bulky code and it also enables us to reuse 
// previously written selector function
export const selectAppRootState = createSelector(
  selectRootState,
  (state) => state.app
);

export const selectIsCartLoading = createSelector(
  selectAppRootState,
  (state) => state.isCartLoading,
);

export const selectCart = createSelector(
  selectAppRootState,
  (app) => app.cart,
);

export const selectSubtotal = createSelector(
  selectCart,
  (cart) => cart.products?.reduce((subTotal, p) => subTotal + p.price, 0) ?? 0,
);

export const selectShippingPrice = createSelector(
  selectCart,
  (cart) => cart.shippingPrice ?? 0,
);

export const selectTaxes = createSelector(
  selectCart,
  (cart) => cart.taxes ?? 0,
);

export const selectTotalCouponsAmount = createSelector(
  selectCart,
  (cart) => cart.coupons?.reduce((subTotal, p) => subTotal + p.discount, 0) ?? 0,
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectShippingPrice,
  selectTaxes,
  selectTotalCouponsAmount,
  (subTotal, shippingPrice, taxes, totalCouponsAmount) => subTotal + shippingPrice + taxes - totalCouponsAmount
);