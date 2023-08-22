import { Cart } from '@models/cart';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StoreState } from '@store';
import { selectCart } from './selectors';

export const addProductAsync = createAsyncThunk(
  'cart/addProductAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);

    const newCart = await fetch('/api/addProduct', {
      method: 'POST',
      body: JSON.stringify(oldCart)
    }).then(resp => resp.json())

    return newCart as Cart;
  })

export const addCouponAsync = createAsyncThunk(
  'cart/addCouponAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);

    const newCart = await fetch('/api/addCoupon', {
      method: 'POST',
      body: JSON.stringify(oldCart)
    }).then(resp => resp.json())

    return newCart as Cart;
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