import { Cart } from '@models/cart';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StoreState } from '@store';
import { selectCart, selectSubtotal } from './selectors';
import { computeSubTotal, computeTotal, computeTotalCoupons } from '@utils';
import { Product } from '@models/product';

export const addProductAsync = createAsyncThunk(
  'cart/addProductAsync',
  async (product:Product|null, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);
    
    const newCart = await fetch('/api/addProduct', {
      method: 'POST',
      body: JSON.stringify({oldCart,product:product?{...product}:{}})
    }).then(resp => resp.json())

    return newCart as Cart;
  })

export const addCouponAsync = createAsyncThunk(
  'cart/addCouponAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);
    const subTotal = selectSubtotal(state);

    try{
      const newCart = await fetch('/api/addCoupon', {
      method: 'POST',
      body: JSON.stringify(oldCart)
    }).then(resp => resp.json())
    newCart as Cart;
    const newCouponsAmount = computeTotalCoupons(newCart.coupons);
    const newSubTotal = computeSubTotal(newCart.products);
    const newTotal = computeTotal(newSubTotal,newCart.shippingPrice,newCart.taxes,newCouponsAmount);

    if(newTotal < subTotal/2){
      throw("Total bill should not be more than half of the total product costs")
    }
    return newCart;
    }catch(err){
      throw(err);
    }
    
  })
  
export const recalculateShippingAsync = createAsyncThunk(
  'cart/recalculateShippingAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);

    const newCart = await fetch('/api/recalculateShipping', {
      method: 'POST',
      body: JSON.stringify(oldCart)
    }).then(resp => resp.json())

    return newCart as Cart;
  })

export const recalculateTaxesAsync = createAsyncThunk(
  'cart/recalculateTaxesAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);

    const newCart = await fetch('/api/recalculateTaxes', {
      method: 'POST',
      body: JSON.stringify(oldCart)
    }).then(resp => resp.json())

    return newCart as Cart;
  })