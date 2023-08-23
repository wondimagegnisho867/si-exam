import { Cart } from '@/models/cart';
import { ActionCreatorWithPayload, createSlice } from '@reduxjs/toolkit';
import { addCouponAsync, addProductAsync, recalculateShippingAsync, recalculateTaxesAsync } from './thunks';
import { getPersistantCart } from '@utils/storage';

export interface AppState {
  isCartLoading: boolean;
  cart: Cart;
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isCartLoading: false,
    cart: ((typeof window !== 'undefined') ? getPersistantCart() : {}) as Cart
  },
  reducers: {
    setCart: (state, { payload }: { payload: Cart }) => {
      return {
        ...state,
        cart: payload,
      }
    },
    removeProduct: (state, { payload }: {payload: string}) => {
      return {
        ...state,
        cart:{...state.cart, products: state.cart.products?.filter((product)=>product.id!==payload)}
      }
    },
    removeCoupoun: (state, { payload }: {payload: string}) => {
      return {
        ...state,
        cart:{...state.cart, coupons: state.cart.coupons?.filter((coupon)=>coupon.id!==payload)}
      }
    }
  },
  extraReducers: (builder) => {
    [
      addProductAsync, addCouponAsync,
      recalculateShippingAsync, recalculateTaxesAsync,
    ].forEach((thunk) => {
      builder.addCase(
        thunk.pending,
        (state) => {
          state.isCartLoading = true;
        }
      );
  
      builder.addCase(
        thunk.fulfilled,
        (state, action) => {
          state.cart = action.payload;
          state.isCartLoading = false;
        }
      );
  
      builder.addCase(
        thunk.rejected,
        (_state, action) => {
          console.error(action.error);
          _state.isCartLoading = false;
        }
      );
    });
  }
});

export const { 
  setCart,
  removeProduct,
  removeCoupoun
} = appSlice.actions as {
  setCart: ActionCreatorWithPayload<Cart, string>;
  removeProduct: ActionCreatorWithPayload<string, string>;
  removeCoupoun: ActionCreatorWithPayload<string, string>;
}